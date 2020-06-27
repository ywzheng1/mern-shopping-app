import React, { useState } from 'react';
import baseUrl from '../utils/baseUrl';
import axios from 'axios'
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon,
} from "semantic-ui-react";

const INITIAL_PRODUCT = {
  name: '',
  price: '',
  media: '',
  description: ''
}

function CreateProduct() {
  const [product, setProduct] = useState(INITIAL_PRODUCT)
  const [mediaPreview, setMediaPreview] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    const {name, value, files} = event.target
    if(name === 'media') {
      setProduct(prevState => ({ ...prevState, media: files[0] }))
      setMediaPreview(window.URL.createObjectURL(files[0]))
    } else {
      setProduct(prevState => ({ ...prevState, [name]: value }))
    }
  }

  async function handleImageUpload() {
    const data = new FormData()
    data.append('file', product.media)
    data.append('upload_preset', 'react-shopping-app')
    data.append('cloud_name', 'dpyebagmn')
    const response = await axios.post(process.env.CLOUDINARY_URL, data)
    const mediaUrl = response.data.url
    return mediaUrl
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const mediaUrl = await handleImageUpload();
    console.log({mediaUrl});
    const url = `${baseUrl}/api/product`;
    const { name, price, description } = product;
    const payload = { name, price, description, mediaUrl };
    const response = await axios.post(url, payload);
    setLoading(false);
    console.log({response});
    setProduct(INITIAL_PRODUCT);
    setSuccess(true);
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" /> Create New Product
      </Header>
      <Form loading={loading} success={success} onSubmit={handleSubmit}>
        <Message 
          success
          icon="check"
          header="Success!"
          content="Your product has been posted"
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            value={product.name}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            value={product.price}
            min="0.00"
            step="0.1"
            type='number'
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="media"
            type='file'
            label='Media'
            accept='image/*'
            content='Select Image'
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size='small' />
        <Form.Field 
          control={TextArea}
          name='description'
          label='Description'
          placeholder='Description'
          value={product.description}
          onChange={handleChange}
        />
        <Form.Field 
          control={Button}
          disabled={loading}
          color='blue'
          icon='pencile alternate'
          content='Submit'
          type='submit'
        />
      </Form>
    </>
  );
}

export default CreateProduct;
