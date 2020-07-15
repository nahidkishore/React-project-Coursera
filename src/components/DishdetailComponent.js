import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Form, FormGroup, Label, Input, Col, Row,
    BreadcrumbItem, Breadcrumb, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (length) => (val) => !(val) || (val.length <= length);
const minLength = (length) => (val) => (val) && (val.length >= length);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState(
            {isModalOpen: !this.state.isModalOpen}
        );
    }

    render(){
        return (
        <>
        <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>
            Submit Comment
        </ModalHeader>
        <ModalBody>
        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <Row className="form-group">
                        <Label htmlFor="rating" md={2}>Rating</Label>
                        <Col md={10}>
                        <Control.select model=".rating" className="form-control"
                                name="rating">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                        </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="name" md={2}>Your Name</Label>
                        <Col md={10}>
                            <Control.text model=".name" id="name" name="name"
                            placeholder="Your Name" 
                            className="form-control"
                            validators={{
                                required, minLength: minLength(3), maxLength: maxLength(15)
                            }}/>
                            <Errors className="text-danger" model=".name" show="touched" 
                            messages={{
                                required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less"
                            }}/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="comment" md={2}>Comment:</Label>
                        <Col md={10}>
                            <Control.textarea model=".comment" className="form-control" id="comment" name="comment"
                            rows="6"/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={{size: 10, offset: 2}}>
                            <Button type="submit" color="primary" >Submit</Button>
                        </Col>
                    </Row>
            </LocalForm>
        </ModalBody>
    </Modal>
    </>
    )};
}



function RenderDish({dish}) {
    if (dish != null) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                        <CardTitle>
                            {dish.name}
                        </CardTitle>
                        <CardText>
                            {dish.description}
                        </CardText>
                </CardBody>
            </Card>
        )
    }
    else {
        return (<div></div>);
    }
}

function RenderComments({comments}) {
    if (comments != null) {
        
        const commentsMapped = comments.map((comment) => {
            return (
                <div key={comment.id}>
                <p >
                    {comment.comment}
                </p>
                <p>
                    -- {comment.author}, {new Intl.DateTimeFormat('en-US', 
                    {year: 'numeric',
                     month: 'short', 
                      day: '2-digit'
                      }).format(new Date(Date.parse(comment.date)))}
                </p>
                </div>
                );
            });
                return (
                    <div>
                        <h4>Comments</h4>
                        <div>
                            {commentsMapped}
                        </div>
                        <CommentForm />
                    </div>
            );
        }
    else {
        return (<div></div>);
    }
}


const DishDetails = (props) => {
    return (
    <div className="container">
        <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/menu'>Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>
            </div>
           
    </div>);
}


export default DishDetails; 