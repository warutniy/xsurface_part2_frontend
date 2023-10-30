import React, {useState, useRef} from 'react';
import UploadProduct from '../../components/UploadProduct/UploadProduct';
import { createProduct } from '../../api/product';

const defaultProductData = {
    productName: '',
    code: '',
    price: ''
};

const UploadProductContainer = (props) => {

    const { onToggle } = props;

    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [product, setProduct] = useState(defaultProductData);
    const [currentDisplayedCode, setCurrentDisplayedCode] = useState("");
    const [objError, setObjError] = useState({});

    const selectFiles = () => {
        fileInputRef.current.click();
    };

    const handleClickFile = (event) => {
        event.target.value = null;
    };

    const handleChangeFile = (event) => {
        const files = event.target.files;
        if (files.length === 0) return;
        const uniqFiles = [];
        for ( let i = 0; i < files.length; i++ ) {
            if ( !images.some((image) => image.name === files[i].name) ) {
                uniqFiles.push(files[i].name);
            };
        };
        let messages = [];
        for ( let i = 0; i < files.length; i++ ) {
            if ( images.length + uniqFiles.length > 6 ) {
                const message = 'Images must not exceed 6 images';
                messages.push(message);
                break;

            } else {
                if ( files[i].type.split('/')[0] !== 'image' ) {
                    const message = `File name: ${files[i].name} is not image file`;
                    messages.push(message);

                } else if ( files[i].type.split('/')[1] !== 'jpeg' && files[i].type.split('/')[1] !== 'png' ) {
                    const message = `File name: ${files[i].name} is not JPEG. or PNG`; 
                    messages.push(message);

                } else {
                    if ( files[i].size / 1000000 > 50 ) {
                        const message = `Image name: ${files[i].name} has size over 50MB.`;
                        messages.push(message);

                    } else {
                        if ( !images.some((image) => image.name === files[i].name) ) {
                            setImages((prevImages) => [
                                ...prevImages,
                                {
                                    file: files[i],
                                    name: files[i].name,
                                    url: URL.createObjectURL(files[i]),
                                },
                            ]);

                            // validation images error
                            setObjError((prev) => {
                                return {
                                    ...prev,
                                    images: null
                                };
                            });
                            
                        } else {
                            const message = `You have already selected image name: ${files[i].name}`;
                            messages.push(message);
                        };
                    };
                };
            };
        };
        
        if ( messages.length > 0 ) {
            for ( let i = 0; i < messages.length; i++ ) {
                alert(messages[i]);
            };
        };
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);

        const files = event.dataTransfer.files;
        const uniqFiles = [];
        for ( let i = 0; i < files.length; i++ ) {
            if ( !images.some((image) => image.name === files[i].name) ) {
                uniqFiles.push(files[i].name);
            };
        };
        let messages = [];
        for ( let i = 0; i < files.length; i++ ) {
            if ( images.length + uniqFiles.length > 6 ) {
                const message = 'Images must not exceed 6 images';
                messages.push(message);
                break;

            } else {
                if ( files[i].type.split('/')[0] !== 'image' ) {
                    const message = `File name: ${files[i].name} is not image file`;
                    messages.push(message);

                } else if ( files[i].type.split('/')[1] !== 'jpeg' && files[i].type.split('/')[1] !== 'png' ) {
                    const message = `File name: ${files[i].name} is not JPEG. or PNG`; 
                    messages.push(message);

                } else {
                    if ( files[i].size / 1000000 > 50 ) {
                        const message = `Image name: ${files[i].name} has size over 50MB.`;
                        messages.push(message);

                    } else {
                        if ( !images.some((image) => image.name === files[i].name) ) {
                            setImages((prevImages) => [
                                ...prevImages,
                                {
                                    file: files[i],
                                    name: files[i].name,
                                    url: URL.createObjectURL(files[i]),
                                },
                            ]);

                            // validation images error
                            setObjError((prev) => {
                                return {
                                    ...prev,
                                    images: null
                                };
                            });
                            
                        } else {
                            const message = `You have already selected image name: ${files[i].name}`;
                            messages.push(message);
                        };
                    };
                };
            };
        };
        
        if ( messages.length > 0 ) {
            for ( let i = 0; i < messages.length; i++ ) {
                alert(messages[i]);
            };
        };
    };

    const deleteImage = (index) => {
        setImages((prevImages) => 
        prevImages.filter((_, i) => i !== index)
        );
        
        // validation images error
        if ( images.length < 2 && index === 0 ) {
            setObjError((prev) => {
                return {
                    ...prev,
                    images: ""
                };
            });
        }
    };

    const handleChangeProduct = ({ target }) => {
        const { name, value } = target;

        if ( name === 'code' ) {

            const validProductCode = /^[A-Za-z]{2}\-\d{4}$/;
            let isAddition = null;
            if ( value.length > currentDisplayedCode.length ) {
                isAddition = true;
            } else {
                isAddition = false;
            };

            const code_format = (value) => {
                const newValue = value.replace(/\s+/g, "").replace(/[^0-9a-zA-z]/gi, "");
                const codeArray = [];

                for ( let i = 0; i < newValue.length; i++ ) {
                    if ( codeArray.length > 6 ) {
                        break;
                    } else if ( codeArray.length < 2 ) {
                        const validString = /[A-Za-z]/gi;

                        if ( codeArray.length === 1 ) {
                            if ( value.length > 2 ) {
                                if ( validString.test(newValue[i]) ) {
                                    codeArray.push(newValue[i]);
                                    codeArray.push("-");
                                };
                            } else {
                                if ( isAddition === true ) {
                                    if ( validString.test(newValue[i]) ) {
                                        codeArray.push(newValue[i]);
                                        codeArray.push("-");
                                    };
                                } else {
                                    if ( validString.test(newValue[i]) ) {
                                        codeArray.push(newValue[i]);
                                    };
                                };
                            };
                        } else {
                            if ( validString.test(newValue[i]) ) {
                                codeArray.push(newValue[i]);
                            };
                        };
                    } else {
                        const validNumber = /[0-9]/gi;
                        if ( validNumber.test(newValue[i]) ) {
                            codeArray.push(newValue[i]);
                        };
                    };
                };

                return codeArray.join("");
            };

            setCurrentDisplayedCode(code_format(value));
            setProduct((prev) => {
                return {
                    ...prev,
                    [name]: code_format(value)
                };
            });

            // validation code error
            if ( !value ) {
                setObjError((prev) => {
                    return {
                        ...prev,
                        [name]: ""
                    };
                });
            } else if ( !validProductCode.test(code_format(value)) ) {
                setObjError((prev) => {
                    return {
                        ...prev,
                        [name]: "Code pattern must be XX-0000."
                    };;
                });
            } else {
                setObjError((prev) => {
                    return {
                        ...prev,
                        [name]: null
                    };;
                });
            };

        } else if ( name === 'price' ) {

            const validPriceNumber = /^\d*\.?\d{0,2}$/;
            if ( validPriceNumber.test(value) || value === '' ) {
                setProduct((prev) => {
                    return {
                        ...prev,
                        [name]: value
                    };
                });
            };
            
            // validation price error
            const validPriceNumberError = /^\d+/;
            const validPriceNumberError_2 = /^\.+/;
            if ( !value ) {
                setObjError((prev) => {
                    return {
                        ...prev,
                        [name]: ""
                    };
                });
            } else if ( !validPriceNumberError.test(value) && !validPriceNumberError_2.test(value) ) {
                setObjError((prev) => {
                    return {
                        ...prev,
                        [name]: "Price must be a number"
                    };
                });
            } else {
                setObjError((prev) => {
                    return {
                        ...prev,
                        [name]: null
                    };
                });
            };

        } else {
        
            setProduct((prev) => {
                return {
                    ...prev,
                    [name]: value
                };
            });

            // validation product error
            if ( !value ) {
                setObjError((prev) => {
                    return {
                        ...prev,
                        [name]: ""
                    };
                });
            } else if ( value.length > 16 ) {
                setObjError((prev) => {
                    return {
                        ...prev,
                        [name]: "Product name must not exceed 16 characters."
                    };;
                });
            } else if ( value.match(/\S/g) === null || value.match(/\S/g).length < 4 ) {
                setObjError((prev) => {
                    return {
                        ...prev,
                        [name]: "Product name must be at least 4 characters."
                    };;
                });
            } else {
                setObjError((prev) => {
                    return {
                        ...prev,
                        [name]: null
                    };;
                });
            };

        };
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if ( images.length < 1 ) {
            setObjError((prev) => {
                return {
                    ...prev,
                    images: "Please choose an image."
                };
            });
        };

        if ( !product.productName ) {
            setObjError((prev) => {
                return {
                    ...prev,
                    productName: "Please fill out this field."
                };
            });
        };

        if ( !product.code ) {
            setObjError((prev) => {
                return {
                    ...prev,
                    code: "Please fill out this field."
                };
            });
        };

        if ( !product.price ) {
            setObjError((prev) => {
                return {
                    ...prev,
                    price: "Please fill out this field."
                };
            });
        };

        if ( Object.keys(objError).length > 3 && Object.values(objError).every((item) => item === null) ) {
            try {
                const formData = new FormData();
    
                for ( let i = 0; i < images.length; i++ ) {
                    formData.append("images", images[i].file);
                };
                for ( let key in product ) {
                    formData.append(key, product[key]);
                };
    
                await createProduct(formData);
                setImages([]);
                setProduct({});
                setObjError({});
                onToggle();
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            } catch (error) {
                console.log(error);
            };
        };
    };

    return (
        <>
            <UploadProduct
                images={images}
                isDragging={isDragging}
                fileInputRef={fileInputRef}
                product={product}
                objError={objError}
                selectFiles={selectFiles}
                onClickFile={handleClickFile}
                onChangeFile={handleChangeFile}
                deleteImage={deleteImage}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onChangeProduct={handleChangeProduct}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default UploadProductContainer;