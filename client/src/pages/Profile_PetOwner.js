import React, { useState } from 'react';
// import { NavLink } from "react-router-dom";
import 'antd/dist/antd.css';
import { useMutation, useQuery } from '@apollo/client';
import { Container, Row, Col, Image, Card, ListGroup } from 'react-bootstrap';
import '../styles/loginUser.css';
import '../styles/profile.css';
import { Form, Input, Button, Radio } from 'antd';

import { GET_HEALTHS, GET_SIZES, GET_SOCIABILITIES, QUERY_ME_PETOWNER } from '../utils/queries';

import { ADD_PET } from '../utils/mutations';





const ProfilePetOwner = () => {
  const [AddPet] = useMutation(ADD_PET)

  const onFinish = async (values) => {
    console.log('Success:', values);
    const variables = {
      owner: petOwner._id,
      description: values.description,
      name: values.name,
      image: values.image,
      size: state.size,
      health: state.health,
      sociability: state.social
    }
    console.log(variables)
    const mutationResponse = await AddPet({
      variables: {
        owner: petOwner._id,
        description: values.description,
        name: values.name,
        image: values.image,
        size: state.size,
        health: state.health,
        sociability: state.social
      }
    })
    return mutationResponse

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



  const { TextArea } = Input;


  const onChangeTextArea = e => {
    console.log('Change:', e.target.value);
  };

  const { loading: loadingPetOwner, data: dataPetOwner } = useQuery(QUERY_ME_PETOWNER); // 400ms 
  const petOwner = dataPetOwner?.me.petOwner || []
  console.log(petOwner)

  const { loading: loadingHealths, data: dataHealth } = useQuery(GET_HEALTHS);
  const healthsList = dataHealth?.healths || []


  const healths = []
  healthsList.map(health => {
    healths.push({ label: health.name, value: health._id })
  })

  const { loading: loadingSizes, data: dataSize } = useQuery(GET_SIZES);
  const sizesList = dataSize?.sizes || []


  const sizes = []
  sizesList.map(size => {
    sizes.push({ label: size.name, value: size._id })
  })

  const { loading: loadingSociabilities, data: dataSociability } = useQuery(GET_SOCIABILITIES);
  const sociabilitiesList = dataSociability?.sociabilities || []
  console.log()

  const sociabilities = []
  sociabilitiesList.map(sociability => {
    sociabilities.push({ label: sociability.name, value: sociability._id })
  })



  const [state, setFormState] = useState({
    health: "",
    social: "",
    size: ""
  })

  const handleChange = (event) => {
    console.log(event.target.value)
    const { name, value } = event.target;
    setFormState({
      ...state,
      [name]: value,
    });
    console.log(state)
  };


  return (
    <Container>

      {loadingPetOwner ? (<div>Loading</div>) : (

        <Row>

          <Col>
            Add Pet
            <Form
              name="basic"
              className='profile-form'
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Description"
                name="description"
                onChange={onChangeTextArea}
              >
                <TextArea

                />
              </Form.Item>

              <Form.Item
                label="Name"
                name="name"

                rules={[
                  {
                    required: true,
                    message: 'Please enter the name!',
                  },
                ]}
              >

                <Input
                />
              </Form.Item>

              {loadingHealths ? (
                <div>Loading...</div>
              ) : (
                <Form.Item>
                  <p>Healths</p>
                  <Radio.Group options={healths} onChange={handleChange} name="health" />
                </Form.Item>)}
              {loadingSizes ? (
                <div>Loading...</div>
              ) : (
                <Form.Item>
                  <p>Sizes</p>

                  <Radio.Group options={sizes} onChange={handleChange} name="size" />
                </Form.Item>)}

              {loadingSociabilities ? (
                <div>Loading...</div>
              ) : (

                <Form.Item>
                  <p>Sociability</p>
                  <Radio.Group options={sociabilities} onChange={handleChange} name="social" />

                </Form.Item>)}



              <Form.Item
                label="Image"
                name="image"
              >
                <Input />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button id='submit-button' type="primary" htmlType="submit">
                  Add Pet
                </Button>
              </Form.Item>


              {/* <NavLink id="message" to="/signup-user"> Don't have an account? Sign up</NavLink> */}
            </Form>

          </Col>
          <Col>
            Pets
            {
              petOwner.petsOwned.map(pet => (
                <div>
                  <Card style={{ width: '18rem' }}>
                    <Card.Header className="d-flex justify-content-center"><img className="cardImage" src={require("../images/puppy.jpeg")}></img></Card.Header>
                    <ListGroup>
                      <ListGroup.Item >Name: {pet.name}</ListGroup.Item>
                      <ListGroup.Item>Size: {pet.size.name}</ListGroup.Item>
                      <ListGroup.Item>Description: {pet.description.name}</ListGroup.Item>
                      <ListGroup.Item>Health: {pet.health.name}</ListGroup.Item>
                      <ListGroup.Item>Sociability: {pet.sociability.name}</ListGroup.Item>
                      <ListGroup.Item>Rating: {pet.ratings.name}</ListGroup.Item>

                    </ListGroup>
                  </Card>
                </div>
              ))
            }
          </Col>

          <Col>
            Events
            {
              petOwner.eventsOwned.map(event => (
                <div>
                  <Card style={{ width: '18rem' }}>
                    <Card.Header className="d-flex justify-content-center"></Card.Header>
                    <ListGroup>
                      <ListGroup.Item >Name: {event.petSitter.name}</ListGroup.Item>
                      <ListGroup.Item>Name: {event.pets[0].name}</ListGroup.Item>
                      <ListGroup.Item>Start Date: {event.daysOfEvent.start}</ListGroup.Item>
                      <ListGroup.Item>End Date: {event.daysOfEvent.end}</ListGroup.Item>
                      <ListGroup.Item>Price: {event.price}</ListGroup.Item>
                      <ListGroup.Item>Status: {event.status}</ListGroup.Item>
                      <ListGroup.Item>Rating:  {event.petsRating[0]}</ListGroup.Item>
                      <ListGroup.Item>Rating: {event.petsRating}</ListGroup.Item>
                    </ListGroup>
                  </Card>
                </div>
              ))
            }

          </Col>
        </Row>
      )}
    </Container>
  );

};

export default ProfilePetOwner;