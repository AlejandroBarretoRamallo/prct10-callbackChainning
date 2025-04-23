import * as funko from './funkoFunctions.js';
import express from 'express';
const app = express();
app.use(express.json());
app.post('/add', (req, res) => {
    let request = req.body;
    console.log('Adding request recived');
    if (request.id == undefined || request.funkoPop == undefined) {
        res.send('Error: id and object funkoPop must be given');
    }
    funko.checkPath(request.user, request.id, request.funkoPop)
        .then((datos) => {
        return funko.addFunko(datos[2], datos[0]);
    })
        .then((response) => {
        console.log('Sending response');
        res.send(response);
    })
        .catch((response) => {
        console.log('Error on th request, sending response');
        res.send(response);
    });
});
app.get('/show', (req, res) => {
    if (!req.query.id) {
        console.log('Error on the request, sending response');
        res.send({
            success: false,
            error: 'An id must be provided'
        });
    }
    else if (!req.query.user) {
        console.log('Error on the request, sending response');
        res.send({
            success: false,
            error: 'A user must be provided'
        });
    }
    else {
        let request = {
            user: req.query.user,
            id: Number(req.query.id)
        };
        console.log('Reading request recived');
        funko.checkPath(request.user, request.id)
            .then((datos) => {
            return funko.showFunko(datos[0], request.id);
        })
            .then((response) => {
            console.log('Sending response');
            res.send(response);
        })
            .catch((response) => {
            console.log('Error on the request, sending response');
            res.send(response);
        });
    }
});
app.get('/list', (req, res) => {
    if (!req.query.user) {
        console.log('Error on the request, sending response');
        res.send({
            success: false,
            error: 'A user must be provided'
        });
    }
    else {
        let request = {
            user: req.query.user,
        };
        console.log('Reading request recived');
        funko.checkPath(request.user)
            .then((datos) => {
            return funko.listFunko(datos[0]);
        })
            .then((response) => {
            console.log('Sending response');
            res.send(response);
        })
            .catch((response) => {
            console.log('Error on the request, sending response');
            res.send(response);
        });
    }
});
app.delete('/delete', (req, res) => {
    if (!req.query.user) {
        res.send({
            success: false,
            error: 'Error: a user must be provided'
        });
    }
    else if (!req.query.id) {
        res.send({
            success: false,
            error: 'Error: a id must be provided'
        });
    }
    else {
        let request = {
            user: req.query.user,
            id: Number(req.query.id)
        };
        console.log('Reading request recived');
        funko.checkPath(request.user, request.id)
            .then((datos) => {
            return funko.deleteFunko(datos[0], datos[1]);
        })
            .then((response) => {
            console.log('Sending response');
            res.send(response);
        })
            .catch((response) => {
            console.log('Error on the request, sending response');
            res.send(response);
        });
    }
});
app.patch('/modify', (req, res) => {
    if (!req.query.user) {
        res.send({
            success: false,
            error: 'Error: a user must be provided'
        });
    }
    else if (!req.query.id) {
        res.send({
            success: false,
            error: 'Error: a id must be provided'
        });
    }
    else if (!req.body) {
        res.send({
            success: false,
            error: 'Error: modified funko ust be provided'
        });
    }
    else if (req.body.id !== Number(req.query.id)) {
        res.send({
            success: false,
            error: 'The query id and the funko id does not match'
        });
    }
    else {
        let request = {
            user: req.query.user,
            id: Number(req.query.id),
            funkoPop: req.body
        };
        console.log('Reading request recived');
        funko.checkPath(request.user, request.funkoPop?.id)
            .then((datos) => {
            return funko.modifyFunko(datos[0], request.funkoPop);
        })
            .then((response) => {
            console.log('Sending response');
            res.send(response);
        })
            .catch((response) => {
            console.log('Error on the request, sending response');
            res.send(response);
        });
    }
});
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
