interface IMovie {
    name: string;
    duration: number;
    description: string;
    trailerLink: string;
    releaseDate: Date;
    nation: string;
    director: string;
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
    fullName: string;
    dateOfBirth: Date;
    biography: string;
    nationality: string;
}

interface Movie {
    id: string;
    name: string;
    director: string;
    moviePosters: Array<{ id: number; link: string; isThumb: boolean }>;
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
        id: string;
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

interface IActorData {
    fullName: string;
    dateOfBirth: string;
    biography: string;
    nationality: string;
    id: string;
    gender: string;
    profilePicture: string;
    movieParticipants: Array<{ id: string; movieId: string; peopleId: string }>;
}

interface IActorValidation {
    fullName: string;
    dateOfBirth: Date;
    biography: string;
    nationality: string;
}

interface INews {
    id: string;
    title: string;
    shortDesc: string;
    newsPictures: [
        {
            id: string;
            link: string;
            newsId: string;
        }
    ];
}

interface INewsValidation {
    title: string;
    shortDesc: string;
    fullDesc: string;
    base64NewsPictures: File[];
}

interface INewsData {
    id: string;
    title: string;
    shortDesc: string;
    fullDesc: string;
    newsPictures: [
        {
            id: string;
            link: string;
            newsId: string;
        }
    ];
    createdAt: Date;
}
