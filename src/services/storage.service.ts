import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import { storage } from "../lib/firebase";

export const storageService = {
  /**
   * List all images in the three standard storage directories: blog-images, featured-images, editor-images
   */
  async listAllImages(): Promise<{ url: string; name: string; folder: string; id: string }[]> {
    const folders = ["blog-images", "featured-images", "editor-images"];
    let allImages: { url: string; name: string; folder: string; id: string }[] = [];
    
    for (const folder of folders) {
      try {
        const folderRef = ref(storage, folder);
        const res = await listAll(folderRef);
        const itemPromises = res.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return {
            url,
            name: item.name,
            folder,
            id: `${folder}/${item.name}`
          };
        });
        const items = await Promise.all(itemPromises);
        allImages = [...allImages, ...items];
      } catch (err) {
        console.warn(`Could not list images in ${folder}:`, err);
      }
    }
    return allImages;
  },

  /**
   * Uploads an image file to a specified folder inside Firebase Storage
   * @param file The file object to upload
   * @param folder The target directory (e.g., 'featured-images', 'editor-images')
   * @returns Promise containing the public download URL of the uploaded asset
   */
  async uploadImage(file: File, folder = "blog-images"): Promise<string> {
    // Sanitize and create a unique file name
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
    const fileName = `${timestamp}_${sanitizedName}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);

    // Upload bytes
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get and return the public URL
    return await getDownloadURL(snapshot.ref);
  },

  /**
   * Deletes an image asset from Firebase Storage given its public download URL
   * @param imageUrl The full download URL of the image
   */
  async deleteImageByUrl(imageUrl: string): Promise<void> {
    if (!imageUrl || !imageUrl.includes("firebasestorage.googleapis.com")) return;

    try {
      // Extract the storage path from the public URL
      const decodedUrl = decodeURIComponent(imageUrl);
      const parts = decodedUrl.split("/o/");
      if (parts.length < 2) return;
      
      const pathWithQuery = parts[1];
      const filePath = pathWithQuery.split("?")[0];
      
      const storageRef = ref(storage, filePath);
      await deleteObject(storageRef);
    } catch (error) {
      console.error("Failed to delete old image from storage:", error);
    }
  }
};
