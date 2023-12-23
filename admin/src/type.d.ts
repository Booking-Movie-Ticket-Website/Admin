interface IMovie {
    name: string;
    duration: number;
    description: string;
    trailerLink: string;
    releaseDate: Date;
    nation: string;
    // totalReviews: number;
    // avrStars: number;
    director: string;
    // movieCategoryIds: string;
    // movieParticipantIds: string;
    moviePosters: Array<IMoviePosters>;
}

interface IMoviePosters {
    base64?: File;
    isThumb: boolean;
}

interface IActors {
    fullName: string;
    id: string;
    profilePicture: string;
}

interface IActor {
    profession: string;
    fullName: string;
    dateOfBirth: Date;
    biography: string;
    nationality: string;
}
