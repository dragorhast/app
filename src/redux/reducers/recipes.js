export const initialState = {
  loading: true,
  error: null,
  meals: [{ id: 1, title: '---' }, { id: 2, title: '----- ---' }],
  recipes: [
    {
      placeholder: true,
      id: 0,
      title: '---- --- -- ------',
      body: '---- --- -- ------ ---- --- -- ------ ---- --- -- ------ ---- --- -- ------',
      author: '---- ------ ',
      category: 1,
      image:
        'https://firebasestorage.googleapis.com/v0/b/react-native-starter-app.appspot.com/o/image-1.jpg?alt=media&token=9f7c839b-2d40-4660-a2a0-bf6c2f64a2e5',
      ingredients: ['---- --- -- ------', '---- ------ --- --'],
      method: ['---- --- -- ------', '---- ------ --- --'],
    },
  ],
  favourites: [],
};

export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case 'FAVOURITES_REPLACE': {
      return {
        ...state,
        favourites: action.data || [],
      };
    }
    case 'MEALS_REPLACE': {
      return {
        ...state,
        error: null,
        loading: false,
        meals: action.data,
      };
    }
    case 'RECIPES_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'RECIPES_REPLACE': {
      let recipes = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        recipes = action.data.map(item => ({
          id: item.id,
          title: item.title,
          body: item.body,
          category: item.category,
          image: item.image,
          author: item.author,
          ingredients: item.ingredients,
          method: item.method,
        }));
      }

      return {
        ...state,
        error: null,
        loading: false,
        recipes,
      };
    }
    default:
      return state;
  }
}
