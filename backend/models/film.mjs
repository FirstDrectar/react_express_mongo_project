import Mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const encodingFormatArray = ["VHS", "DVD", "Blu-Ray"];

const FilmSchema = new Mongoose.Schema(
    {
        name: String,
        releaseDate: String,
        format: String,
        actorList: [{ name: String, surname: String }]
    }
);
Mongoose.plugin(mongoosePaginate);
const Statics = {
    addNewFilm(film) {
        if (-1 < encodingFormatArray.findIndex((val) => val === film.format))
            return Film.create(film);
        throw new Error(`${film.format} isn\`t encoding Format`);
    },
    deleteById(_id) {
        return Film.findByIdAndDelete({ _id });
    },
    getAll() {
        return Film.find();
    },
    async getPart(page, limit, search = null) {
        try {
            if (!search) {
                const result = await Film.paginate({}, { page, limit });
                // console.log(result);
            }

        }
        catch (err) {
            console.log(err.message);
        }
    }
}
const Methods = {

}
FilmSchema.statics = Statics;
FilmSchema.methods = Methods;
export const Film = Mongoose.model("Film", FilmSchema);
