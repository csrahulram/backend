import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    dob: {type: Date, required: true},
  },
  {
    methods: {
      getAge() {
        const age = new Date().getFullYear() - this.dob.getFullYear();
        console.log(`Age is: ${age}`);
        return age;
      },
    },
  }
);

export type UserType = mongoose.InferSchemaType<typeof userSchema>;
export const User = mongoose.model('User', userSchema);