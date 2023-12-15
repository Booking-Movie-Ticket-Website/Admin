interface IMovie {
    name: string;
    duration: number;
    description: string;
    trailerLink: string;
    releaseDate: Date;
    nation: string;
    totalReviews: number;
    avrStars: number;
    isActive: boolean;
    movieCategoryIds: string[];
    movieParticipantIds: string[];
}
