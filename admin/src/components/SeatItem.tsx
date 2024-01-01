import React from "react";

interface Props {
    numberOfRow: string;
    numberOfColumn: string;
    id: string;
}

const SeatItem: React.FC<Props> = ({ numberOfColumn, numberOfRow }) => {
    return (
        <div className="rounded-xl border border-blue p-2">
            <div className="text-center">
                <div>
                    {numberOfRow}
                    {numberOfColumn}
                </div>
            </div>
        </div>
    );
};

export default SeatItem;
