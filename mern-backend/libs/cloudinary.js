import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: "dynpy0r4v",
    api_key: "722279687758731",
    api_secret: "KsLk7dNUAAjRYEBNUsv2JAV7cPI"
})

export const uploadImage = async function fileUpload(file){
    return await cloudinary.v2.uploader.upload(file, {
        folder: 'publicaciones'
    })
}

export const deleteImage = async function deleteUpload(id){
    return await cloudinary.uploader.destroy(id)
}
