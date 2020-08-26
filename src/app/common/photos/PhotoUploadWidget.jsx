import React, { useState } from "react";
import { Grid, Header, Button } from "semantic-ui-react";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import cuid from 'cuid';
import { getFileExtension } from "../util/util";
import { UploadToFirebaseStorage } from "../../firestore/firebaseService";
import { toast } from "react-toastify";
import { updateUserProfilePhoto } from "../../firestore/firestoreService";
import * as firebase from "firebase";


export default function PhotoUploadWidget({setEditMode}) {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleUploadImage() {
      setLoading(true);
      const filename = cuid() + '.' + getFileExtension(files[0].name);
      const uploadTask = UploadToFirebaseStorage(image, filename);     
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {          
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
      }, error => {
          toast.error(error.message);
      }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              updateUserProfilePhoto(downloadURL, filename).then(() => {
                  setLoading(false);
                  handleCancelCrop();
                  setEditMode(false);
              }).catch(error => {
                toast.error(error.message)
                setLoading(false);
              } ) 
          })
      })
  }

  function handleCancelCrop() {
      setFiles([]);
      setImage(null);
  }

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header color='teal' sub content='Step 1 - Add Photo' />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color='teal' sub content='Step 2 - Resize' />
        {files.length > 0 && (
          <PhotoWidgetCropper
            setImage={setImage}
            imagePreview={files[0].preview}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color='teal' sub content='Step 3 - Preview & upload' />
        {files.length > 0 && (
          <>
            <div
              className='img-preview'
              style={{ minHeight: 200, minWidth: 200, overflow: "hidden" }}
            />
            <Button.Group>
              <Button loading={loading} onClick={handleUploadImage} style={{ width: 100 }} positive icon='check' />
              <Button disabled={loading} onClick={handleCancelCrop} style={{ width: 100 }} icon='close' />
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}
