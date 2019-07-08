import mongoose from "mongoose";
const encodingFormatArray = ["VHS", "DVD", "Blu-Ray"];
const filmSchema = new mongoose.Schema(
    {
        name: String,
        releaseDate: String,
        format: String,
        actorList: [{ name: String, surname: String }]
    }
);
const Statics = {
    addNewFilm(film) {
        if (-1 < encodingFormatArray.findIndex((val) => val === film.format))
            return Film.create(film);
        throw new Error(`${film.format} isn\`t encoding Format`);
    },
    deleteById(_id){
       return Film.findByIdAndDelete({_id});
    },
    getAll() {
        return Film.find();
    },
    getPart(page,part){

    }
}
const Methods = {

}
filmSchema.statics = Statics;
filmSchema.methods = Methods;
export const Film = mongoose.model("Film", filmSchema);
