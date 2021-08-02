import React from 'react'
import "./home.css"
import {
    Card, Button, CardHeader, CardBody,
    CardTitle, CardText
} from 'reactstrap';

function Home() {
    return (
        <>
            <h2>Home</h2>
            <Card className="blog-card">
                <CardHeader>Header</CardHeader>
                <CardBody>
                    <CardTitle tag="h5">Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button>Go somewhere</Button>
                </CardBody>
               
            </Card>

            <Card className="blog-card">
                <CardHeader>Header</CardHeader>
                <CardBody>
                    <CardTitle tag="h5">Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button>Go somewhere</Button>
                </CardBody>
               
            </Card>

            <Card className="blog-card">
                <CardHeader>Header</CardHeader>
                <CardBody>
                    <CardTitle tag="h5">Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button>Go somewhere</Button>
                </CardBody>
               
            </Card>

            
        </>
    )
}

export default Home
