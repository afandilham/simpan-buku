<script setup>
import { ref, reactive, watch } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useBooks } from "../../stores/books";
import useNotifications from "../../hooks/notifications";
import BookCard from "../ui/books/BookCard.vue";

const props = defineProps({
  showForm: {
    type: Boolean,
    required: true,
  },
  bookId: {
    type: String,
    default: "",
  },
  isEdit: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const emits = defineEmits(["close"]);

const books = useBooks();
const title = ref("");
const author = ref("");
const imgUrl = ref("");
const publisher = ref("");
const category = ref("");
const rating = ref("");
const status = ref("");
const review = reactive({
  editor: ClassicEditor,
  editorData: "",
  editorConfig: {
    toolbar: ["bold", "italic", "link", "undo", "redo"],
    placeholder: "Your Review",
  },
});
const categoryData = [
  "Comic",
  "Education",
  "Financial",
  "Fiction",
  "Psychology",
  "Romance",
  "Religion",
  "Science",
  "Technology",
];
const ratingData = ["horrible", "bad", "fine", "good", "masterpiece"];
const statusData = ["read", "planning", "on-going"];

const [ isSuccess, isFailed ] = useNotifications();

watch(
  () => props.isEdit,
  (newValue, _) => {
    if (!newValue) {
      clearBook();
    }
  }
);

watch(
  () => [props.bookId, props.isEdit],
  ([newId, newValue], [oldId, oldValue]) => {
    if (newId && newValue === true) {
      let book = books.getFilteredBook(newId);
      title.value = book[0].title;
      author.value = book[0].author;
      imgUrl.value = book[0].imgUrl;
      publisher.value = book[0].publisher;
      category.value = book[0].category;
      rating.value = book[0].rating;
      status.value = book[0].status;
      review.editorData = book[0].review;
    }
  }
);

const createBook = async () => {
  try {
    const book = {
      id: props.bookId,
      title: title.value,
      author: author.value,
      imgUrl: imgUrl.value,
      publisher: publisher.value,
      category: category.value,
      rating: rating.value,
      status: status.value,
      review: review.editorData,
    };
    props.bookId === ""
      ? await books.createBook(book)
      : await books.updateBook(book);
    clearBook();
    emits("close");

    isSuccess.value = true;
    setTimeout(() => {
      isSuccess.value = false;
    }, 3000);
  } catch (error) {
    isFailed.value = true;
    setTimeout(() => {
      isFailed.value = false;
    }, 3000);
    throw new Error("Data failed to saved!", error.message);
  }
};

const clearBook = () => {
  title.value = "";
  author.value = "";
  imgUrl.value = "";
  publisher.value = "";
  category.value = "";
  rating.value = "";
  status.value = "";
  review.editorData = "";
};

const close = () => {
  isSuccess.value = false;
};
</script>

<template>
  <teleport to="body">
    <base-notification
      v-if="isSuccess"
      mode="success"
      message="Book saved!"
      @close="close">
    </base-notification>
    <base-notification
      v-if="isFailed"
      mode="failed"
      message="Book failed to saved!"
      @close="close">
    </base-notification>
    <transition name="fade">
      <div v-if="showForm">
        <div
          class=" fixed top-0 left-0 h-full w-full shadow-lg bg-dark-grayish opacity-70 overflow-hidden z-20" @click="$emit('close')">
          </div>
        <book-card>
          <template #default>
            <form
              class="w-full p-3"
              @submit.prevent="createBook">
              <div class=" flex justify-between items-center border-b-2 border-white-grayish pb-3 mb-4">
                <h2 class="text-xl font-semibold tracking-tight">{{ props.isEdit === false ? 'Add': 'Edit' }} book</h2>
                <button @click.prevent="$emit('close')">
                  <svg
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="py-2">
                <base-input
                  v-model="title"
                  label="title"
                  type="text"
                  placeholder="Book Title">
                </base-input>
              </div>
              <div class="py-2">
                <base-input
                  v-model="author"
                  label="author"
                  type="text"
                  placeholder="Book Author">
                </base-input>
              </div>
              <div class="py-2">
                <base-input
                  v-model="imgUrl"
                  label="imgUrl"
                  type="text"
                  placeholder="URL image"
                >
                </base-input>
              </div>
              <div class="py-2">
                <base-input
                  v-model="publisher"
                  label="publisher"
                  type="text"
                  placeholder="Book Publisher"
                >
                </base-input>
              </div>
              <div class="py-2">
                <base-select
                  v-model="category"
                  label="category"
                  :input-data="categoryData">
                </base-select>
              </div>
              <div class="py-2">
                <base-select
                  v-model="rating"
                  label="rating"
                  :input-data="ratingData">
                </base-select>
              </div>
              <div class="pt-2 pb-4">
                <base-select
                  v-model="status"
                  label="status"
                  :input-data="statusData">
                </base-select>
              </div>
              <ckeditor
                v-model="review.editorData"
                class="py-2"
                :editor="review.editor"
                :config="review.editorConfig"
                tag-name="text-area"
              ></ckeditor>
              <div class="py-4">
                <base-button
                  v-if="!isEdit"
                  button-type="submit"
                  mode="button-dark"
                  >Submit</base-button>
                <base-button
                  v-else-if="isEdit"
                  button-type="submit"
                  mode="button-red">
                  Update
                </base-button>
              </div>
            </form>
          </template>
        </book-card>
      </div>
    </transition>
  </teleport>
</template>