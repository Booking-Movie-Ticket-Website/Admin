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

interface IMovieData {
    avrStars: number;
    description: string;
    director: string;
    duration: number;
    id: string;
    isActive: boolean;
    name: string;
    nation: string;
    releaseDate: string;
    reviews: [];
    totalReviews: string;
    trailerLink: string;
    moviePosters: Array<{
        link: string;
        isThumb: boolean;
    }>;
    movieCategories: Array<{
        id: string;
        movieId: string;
        categoryId: string;
        category: { name: string };
    }>;
    movieParticipants: Array<{
        id: string;
        movieId: string;
        profession: string;
        peopleId: string;
        people: {
            fullName: string;
            profilePicture: string;
            nationality: string;
        };
    }>;
}
