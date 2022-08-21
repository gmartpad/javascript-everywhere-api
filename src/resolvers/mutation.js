module.exports = {
  newNote: async (parent, args, { models }) => {
    return models.Note.create({
      content: args.content,
      author: 'Adam Scott'
    })
  },
  updateNote: async (parent, args, { models }) => {
    return models.Note.findOneAndUpdate(
      { 
        _id: args.id
      }, 
      { 
        $set: {
          content: args.content
        } 
      }, 
      { 
        new: true 
      }
    );
  },
  deleteNote: async (parent, args, { models }) => {
    try {
      models.Note.findOneAndRemove({ _id: args.id });
      return true;
    } catch {
      return false;
    }
  }
}