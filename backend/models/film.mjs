import Mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import escapeStringRegexp from 'escape-string-regexp';
const encodingFormatArray = ["VHS", "DVD", "Blu-Ray"];

const FilmSchema = new Mongoose.Schema(
    {
        name: String,
        releaseDate: String,
        format: String,
        actorList: [{ name: String, surname: String}]
    }
);

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
    async getPart(page, limit, searchstr, search, sort) {
        console.log(searchstr);
        if (searchstr) {
            if (search === "name") {
                if (sort === "asc") {
                    return Film.paginate({ name: { $regex: `.*${escapeStringRegexp(searchstr.trim())}.*`, $options: 'i' } }, { page, limit, sort: { name: 'asc' } });

                } else if (sort = "desc") {
                    return Film.paginate({ name: { $regex: `.*${escapeStringRegexp(searchstr.trim())}.*`, $options: 'i' } }, { page, limit, sort: { name: 'desc' } });

                }
            } else if (search === "actor") {
                if (sort === "asc") {
                    return Film.paginate({ 'actorList.name': { $regex: `.*${escapeStringRegexp(searchstr.trim())}.*`, $options: 'i' } }, { page, limit, sort: { name: 'asc' } });
                } else if (sort = "desc") {
                    return Film.paginate({ 'actorList.name': { $regex: `.*${escapeStringRegexp(searchstr.trim())}.*`, $options: 'i' } }, { page, limit, sort: { name: 'desc' } });
                }
            }
        } else {
            if (sort === "asc") {
               
                 return Film.paginate({}, { page, limit, sort: { name: 'asc' } });

            } else if (sort = "desc") {
                return Film.paginate({}, { page, limit, sort: { name: 'desc' } });

            }
        }
        throw new Error("invalid request");
    }
}
const Methods = {

}
FilmSchema.statics = Statics;
FilmSchema.methods = Methods;
FilmSchema.plugin(mongoosePaginate);

export const Film = Mongoose.model("Film", FilmSchema);
