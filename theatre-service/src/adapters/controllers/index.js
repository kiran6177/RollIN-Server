import { UserCreatedConsume } from "./consumeController/user-created-consume.js";
import { TheatreCreatedConsume } from "./consumeController/theatre-created-consume.js";
import { TheatreUpdatedConsume } from "./consumeController/theatre-updated-consume.js";
import { UserUpdatedConsume } from "./consumeController/user-updated-consume.js";

import { UserGetTheatres } from "./user/GetTheatresController.js";

import { TheatreGetTheatreScreen } from "./theatre/theatreGetTheatreScreenController.js";
import { TheatreAddScreen } from "./theatre/theatreAddScreenController.js";
import { TheatreEnrollMovie } from "./theatre/theatreEnrollMovieController.js";
import { TheatreEditScreen } from "./theatre/theatreEditScreenController.js";
import { TheatreRemoveMovie } from "./theatre/theatreRemoveMovieController.js";
import { TheatreExtendMovie } from "./theatre/theatreExtendMovieController.js";

export {
    UserCreatedConsume as UserCreatedConsumeController,
    TheatreCreatedConsume as TheatreCreatedConsumeController,
    TheatreUpdatedConsume as TheatreUpdatedConsumeController,
    UserUpdatedConsume as UserUpdatedConsumeController,
    UserGetTheatres as UserGetTheatresController,
    TheatreGetTheatreScreen as TheatreGetTheatreScreenController,
    TheatreAddScreen as TheatreAddScreenController,
    TheatreEnrollMovie as TheatreEnrollMovieController,
    TheatreEditScreen as TheatreEditScreenController,
    TheatreRemoveMovie as TheatreRemoveMovieController,
    TheatreExtendMovie as TheatreExtendMovieController
}