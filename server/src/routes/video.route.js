import express from 'express';
import { deleteVideoById, getAllVideo, getVideoById, postVideo } from '../controllers/video.controller.js';
import { authorized } from '../middlewares/auth.middleware.js';

const videoRouter = express.Router();

videoRouter.post('/post',authorized, postVideo );
videoRouter.get('/getAll',authorized,getAllVideo );
videoRouter.get('/getById/:id',authorized,getVideoById );
videoRouter.delete('/delete/:id',authorized,deleteVideoById );

export default videoRouter;