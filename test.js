module.exports.update = (req, res, next) => {
    const id = req.params.id;
  
    Payment.findById(id)
      .then(payment => {
        if (payment) {
          Object.assign(payment, {
            group: req.params.groupId,
            subject: req.body.subject,
            amount: req.body.amount,
            date: req.body.date,
            image: req.params.image,
            enum: req.params.enum
          });
  
          payment.save()
            .then(() => {
              res.json(payment);
            })
            .catch(error => {
              if (error instanceof mongoose.Error.ValidationError) {
                next(createError(400, error.errors));
              } else {
                next(error);
              }
            })
        } else {
          next(createError(404, `Payment not found`));
        }
      })
      .catch(error => next(error));
  }