# Development (with auto-restart)
npm run dev

# Production (no auto-restart)
npm start

 #swagger.parameters['body'] = {
      in: 'body',
      description: 'Contact information to update',
      required: true,
      schema: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            description: 'First name of the contact'
          },
          lastName: {
            type: 'string',
            description: 'Last name of the contact'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email address of the contact'
          },
          favoriteColor: {
            type: 'string',
            description: 'Favorite color of the contact'
          },
          birthday: {
            type: 'string',
            format: 'date',
            description: 'Birthday of the contact (YYYY-MM-DD)'
          }
        }
      }
    }