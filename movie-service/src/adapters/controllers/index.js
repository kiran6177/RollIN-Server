import { UserCreatedConsume } from "./consumeController/user-created-consume.js";
import { TheatreCreatedConsume } from "./consumeController/theatre-created-consume.js";
import { TheatreUpdatedConsume } from "./consumeController/theatre-updated-consume.js";
import { UserUpdatedConsume } from "./consumeController/user-updated-consume.js";

import { AdminGetAllTMDBMovies } from "./admin/adminGetTMDBAllMovieController.js";
import { AdminGetTMDBMovieDetail } from "./admin/adminGetTMDBMovieDetailController.js";
import { AdminAddMovieToDB } from "./admin/adminAddMovieToDBController.js";
import { AdminGetMoviesFromDB } from "./admin/adminGetMovieFromDBController.js";

export {
    UserCreatedConsume as UserCreatedConsumeController,
    TheatreCreatedConsume as TheatreCreatedConsumeController,
    TheatreUpdatedConsume as TheatreUpdatedConsumeController,
    UserUpdatedConsume as UserUpdatedConsumeController,
    AdminGetAllTMDBMovies as AdminGetAllTMDBMoviesController,
    AdminGetTMDBMovieDetail as AdminGetTMDBMovieDetailController,
    AdminAddMovieToDB as AdminAddMovieToDBController,
    AdminGetMoviesFromDB as AdminGetMoviesFromDBController
}