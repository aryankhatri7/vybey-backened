console.log("✅ CLOUDINARY MULTER FILE LOADED");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

// ================= STORAGE =================
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "vybey-products",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      public_id: Date.now() + "-" + file.originalname.split(".")[0]
    };
  },
});

// ================= FILE FILTER =================
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, WEBP allowed"), false);
  }
};

// ================= UPLOAD =================
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  }
});

module.exports = upload;
