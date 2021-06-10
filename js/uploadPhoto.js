var uploadImage = document.querySelector("#upload-file");

uploadImage.addEventListener("change", () => {
  let editImageBlock = document.querySelector(".img-upload__overlay");

  if (uploadImage.files[0].type)
  editImageBlock.classList.remove("hidden");
  // editImageBlock.querySelectorAll(".effects__preview").forEach(el => el = uploadImage.files[0])
  document.querySelector(".img-upload__cancel").addEventListener("click", () => {
      editImageBlock.classList.add("hidden");
  });
}, false);
