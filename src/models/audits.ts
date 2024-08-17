import mongoose from 'mongoose';

const mongoSchema = new mongoose.Schema({
    statement:String,
    oldValue: Object,
    newValue: Object,
    createdDate: Date,
    createdBy: String,
    recordedIP: String
});

const Audit = mongoose.model('Audits', mongoSchema, 'audits');

export default Audit;