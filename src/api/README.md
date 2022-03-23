## Usage

### Create API Declations object

```ts
/* 
* /api/camel-profile/camel-profile.ts 
*/

import { getProfile } from "./get-profile";

export const camelProfile = {
  getProfile,
};
```

### Create API Method Declaration
```ts
/* 
* /api/camel-profile/get-profile.ts
*/

import { ApiMethodDeclaration } from "../types";

type ParamsData = {
  page: number;
};

type ResponseData = {
  camels: Array<Camel>
};

export const getProfile: ApiMethodDeclaration<ParamsData, ResponseData> = (
  params
) => ({
  url: "/spotlight",
  method: "GET",
  params,
});

type Camel = {
  id: number;
  name: string;
  gender: string;
  image: string;
};

```

### Init API

```ts
/* 
* /api/api.ts
*/

import { camelProfile } from "./camel-profile";
import { initApi } from "./init-api";

export const api = {
  camelProfile: initApi(camelProfile),
};

```

### Use it
```ts
/* 
* /actions/thunk/camel-profle.ts
*/

const fetchCamelProfile = (page: number) => async (dispatch) => {
  dispatch({ type: 'FETCH_CAMEL_PROFILE' });

  try {
      const { data } = camelProfileApi.getProfile({ page });
      const { data: { camels } } = data;

      dispatch({ 
        type: 'FETCH_CAMEL_PROFILE_SUCCESS', 
        payload: { camels } 
      });
  } catch(error) {
    if (!axios.isCancel(error)) {
      dispatch({ 
        type: 'FETCH_CAMEL_PROFILE_ERROR', 
        payload: { error: error.message } 
      });
    }
  }
}
```

## Request cancellation

### Create cancel token
```ts
/* 
* /actions/thunk/camel-profle.ts
*/

const CancelToken = axios.CancelToken;
export let cancel;

const fetchCamelProfile = (page: number) => async (dispatch) => {
  dispatch({ type: 'FETCH_CAMEL_PROFILE' });

  try {
      const { data } = camelProfileApi.getProfile({ 
        page 
      }, { 
        cancelToken: new CancelToken((c) => {
          cancel: c
        });
      });
      
      const { data: { camels } } = data;

      dispatch({ 
        type: 'FETCH_CAMEL_PROFILE_SUCCESS', 
        payload: { camels } 
      });
  } catch(error) {
    if (!axios.isCancel(error)) {
      dispatch({ 
        type: 'FETCH_CAMEL_PROFILE_ERROR', 
        payload: { error: error.message } 
      });
    }
  
  }
}
```

### Cancel the request
```tsx

import { fetchCamelProfile, cancel } from '../../actions/thunk/camel-profile';

export const MyComponent: React.FC = () => {
  useEffect(() => {
    dispatch(fetchCamelProfile(0));

    return () => {
      // cancel the request
      cancel();
    };
  }, [dispatch]);

  return <div>My component</div>
}

```
