<template>
  <div class="image-uploader" @click="removeImage">
    <label class="image-uploader__preview" :class="{ 'image-uploader__preview-loading': isUpload }" :style="imageSrc">
      <span class="image-uploader__text">{{ previewText }}</span>
      <input
        v-bind="$attrs"
        :disabled="isUpload"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="uploadImage"
      />
    </label>
  </div>
</template>

<script>
import { uploadImage } from '../ImageService';

export default {
  name: 'UiImageUploader',

  props: {
    preview: {
      type: String,
      default: undefined,
    },
    uploader: {
      type: Function,
      default: undefined,
    },
  },

  emits: ['upload', 'error', 'select', 'remove'],

  inheritAttrs: false,

  data() {
    return {
      isUpload: false,
      isSelecting: false,
      selectedImageUrl: undefined,
    };
  },

  computed: {
    previewText() {
      let result = '';
      if (this.isUpload) {
        result = 'Загрузка...';
      } else if (this.selectedImageUrl || (this.preview && !this.isSelecting)) {
        result = 'Удалить изображение';
      } else {
        result = 'Загрузить изображение';
      }
      return result;
    },
    imageSrc() {
      let result = null;
      if (this.preview && !this.selectedImageUrl && !this.isSelecting) {
        result = `--bg-url: url(${this.preview})`;
      } else if (this.selectedImageUrl) {
        result = `--bg-url: url(${this.selectedImageUrl})`;
      }
      return result;
    },
  },

  methods: {
    async uploadImage(e) {
      this.selectedImageUrl = URL.createObjectURL(e.target.files[0]);
      this.$emit('select', e.target.files[0]);

      if (this.uploader) {
        try {
          this.isUpload = true;
          const response = await this.uploader(e.target.files[0]);
          this.$emit('upload', response);
        } catch (error) {
          this.$emit('error', error);
          this.selectedImageUrl = undefined;
        } finally {
          this.isUpload = false;
        }
      }

      e.target.value = '';
      this.isSelecting = false;
    },
    removeImage() {
      if ((this.selectedImageUrl || this.preview) && !this.isUpload) {
        this.isSelecting = true;
        this.$emit('remove');
        this.selectedImageUrl = undefined;
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
