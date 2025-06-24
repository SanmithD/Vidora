import express from 'express';
import { recentSearches, removeAllRecentSearches, removeRecentSearches, saveSearch, search } from '../controllers/search.controller.js';
import { authorized } from '../middlewares/auth.middleware.js';

const searchRouter = express.Router();

searchRouter.get('/',authorized,search);
searchRouter.post('/save/:id',authorized,saveSearch);
searchRouter.get('/recent',authorized,recentSearches);
searchRouter.delete('/remove/:id',authorized,removeRecentSearches);
searchRouter.delete('/removeAll/:id',authorized,removeAllRecentSearches);

export default searchRouter;        