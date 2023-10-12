import React from 'react';
import styles from './UploadProduct.module.css';

const UploadProduct = (props) => {
  const { images,
          isDragging,
          fileInputRef,
          product,
          objError,
          selectFiles,
          onClickFile,
          onChangeFile,
          deleteImage,
          onDragOver,
          onDragLeave,
          onDrop,
          onChangeProduct,
          onSubmit } = props;
          
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}><h1>Upload Product</h1></div>
      <div className={styles.form_box}>
        <form onSubmit={onSubmit}>
          <div className={styles.upload_box}>
            <div className={styles.detail}>
              <h2>Upload image</h2>
              { objError.images && <div className={styles.error}><p>***** {objError.images} *****</p></div> }
            </div>

            {/* drag area */}
            <div className={styles.drag_area} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
              {isDragging ? (
                <div className={styles.upload_container}>
                  <div className={styles.upload_image}>
                    <svg viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.9784 8.92341C7.5166 8.92341 7.9534 9.36533 7.9534 9.90984C7.9534 10.4543 7.5166 10.8963 6.9784 10.8963H5.7655C3.6608 10.8963 1.95 12.6271 1.95 14.7552V21.1669C1.95 23.2963 3.6608 25.0271 5.7655 25.0271H20.2345C22.3379 25.0271 24.05 23.2963 24.05 21.1669V14.7433C24.05 12.6219 22.3444 10.8963 20.2488 10.8963H19.0229C18.4847 10.8963 18.0479 10.4543 18.0479 9.90984C18.0479 9.36533 18.4847 8.92341 19.0229 8.92341H20.2488C23.4195 8.92341 26 11.5342 26 14.7433V21.1669C26 24.384 23.413 27 20.2345 27H5.7655C2.587 27 0 24.384 0 21.1669V14.7552C0 11.5394 2.587 8.92341 5.7655 8.92341H6.9784ZM13.6898 0.279159L17.4806 4.13017C17.8602 4.51685 17.8589 5.14027 17.478 5.52432C17.0958 5.90837 16.4796 5.90836 16.1 5.52169L13.9737 3.36306L13.9745 17.7972H12.0245L12.0237 3.36306L9.90028 5.52169C9.71048 5.71634 9.45958 5.81235 9.20998 5.81235C8.96168 5.81235 8.71208 5.71634 8.52228 5.52432C8.14138 5.14027 8.13878 4.51685 8.51968 4.13017L12.3092 0.279159C12.6745 -0.0930529 13.3245 -0.0930529 13.6898 0.279159Z" fill="#6C6C70"/>
                    </svg>
                  </div>
                  <div className={styles.upload_file}>
                    <p>
                      <span className={styles.select}>Drop images here</span>
                    </p>
                  </div>
                  <div className={styles.limit_box}>
                    <p>JPG. or PNG Maximum file size 50MB.</p>
                  </div>
                </div>
              ) : (
                <div className={styles.upload_container}>
                  <div className={styles.upload_image}>
                    <svg viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule ="evenodd" clipRule ="evenodd" d="M6.9784 8.92341C7.5166 8.92341 7.9534 9.36533 7.9534 9.90984C7.9534 10.4543 7.5166 10.8963 6.9784 10.8963H5.7655C3.6608 10.8963 1.95 12.6271 1.95 14.7552V21.1669C1.95 23.2963 3.6608 25.0271 5.7655 25.0271H20.2345C22.3379 25.0271 24.05 23.2963 24.05 21.1669V14.7433C24.05 12.6219 22.3444 10.8963 20.2488 10.8963H19.0229C18.4847 10.8963 18.0479 10.4543 18.0479 9.90984C18.0479 9.36533 18.4847 8.92341 19.0229 8.92341H20.2488C23.4195 8.92341 26 11.5342 26 14.7433V21.1669C26 24.384 23.413 27 20.2345 27H5.7655C2.587 27 0 24.384 0 21.1669V14.7552C0 11.5394 2.587 8.92341 5.7655 8.92341H6.9784ZM13.6898 0.279159L17.4806 4.13017C17.8602 4.51685 17.8589 5.14027 17.478 5.52432C17.0958 5.90837 16.4796 5.90836 16.1 5.52169L13.9737 3.36306L13.9745 17.7972H12.0245L12.0237 3.36306L9.90028 5.52169C9.71048 5.71634 9.45958 5.81235 9.20998 5.81235C8.96168 5.81235 8.71208 5.71634 8.52228 5.52432C8.14138 5.14027 8.13878 4.51685 8.51968 4.13017L12.3092 0.279159C12.6745 -0.0930529 13.3245 -0.0930529 13.6898 0.279159Z" fill="#6C6C70"/>
                    </svg>
                  </div>
                  <div className={styles.upload_file}>
                    <p>
                      Drag & Drop or <span className={styles.select} role='button' onClick={selectFiles}>Choose file</span> to upload
                    </p>
                  </div>
                  <div className={styles.limit_box}>
                    <p>JPG. or PNG Maximum file size 50MB.</p>
                  </div>
                </div>
              )}
              <input type='file' accept='image/*' name='file' ref={fileInputRef} onChange={onChangeFile} onClick={onClickFile} multiple/>
            </div>
            {/* drag area */}
            
            {/* show image area */}
            <div className={styles.image_container}>
              {images.map((image, index) => (
                <div className={styles.image} key={index}>
                  <span className={styles.delete} onClick={() => deleteImage(index)}>&times;</span>
                  <img src={image.url} alt={image.name} />
                </div>
              ))}
            </div>
            {/* show image area */}

            <div className={styles.info}><h3>Image upload ({images.length}/6)</h3></div>
          </div>
          <div className={styles.input_box}>
            <div className={styles.detail}>
              <h2>Product name</h2>
              { objError.productName && <div className={styles.error}><p>***** {objError.productName} *****</p></div> }
            </div> 
            <div className={styles.input_container}>
              <input type="text" name="productName" value={product.productName || ''} onChange={onChangeProduct} placeholder='Product name' />
            </div>
          </div>
          <div className={styles.input_box}>
            <div className={styles.detail}>
              <h2>Code</h2>
              { objError.code && <div className={styles.error}><p>***** {objError.code} *****</p></div> }
              { objError.code === null && <div className={styles.valid}><p>***** Code pattern is exactly XX-0000. *****</p></div> }
            </div>
            <div className={styles.input_container}>
              <input type="text" name="code" value={product.code || ''} onChange={onChangeProduct} placeholder='XX-0000' />
            </div>
          </div>
          <div className={styles.input_box}>
            <div className={styles.detail}>
              <h2>Price</h2>
              { objError.price && <div className={styles.error}><p>***** {objError.price} *****</p></div> }
            </div>
            <div className={styles.input_container}>
              <input type="text" name="price" value={product.price || ''} onChange={onChangeProduct} placeholder='฿1,000' />
            </div>
          </div>
          <div className={styles.btn_box}>
            <button type='reset' className={styles.cancel_btn}><p>ยกเลิก</p></button>
            <button type='submit' className={styles.confirm_btn}><p>ยืนยัน</p></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;