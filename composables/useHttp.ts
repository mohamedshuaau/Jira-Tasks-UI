import {toast} from "vue3-toastify";
import {useAuthStore} from "~/stores/AuthStore";

export const useHttp = async (
    url: string,
    {
      method = "get",
      body = {},
      headers = {},
      fileUpload = false,
      overrideError = false
    }: {
      method?: any;
      body?: object;
      headers?: any;
      fileUpload?: boolean;
      overrideError?: boolean;
    } = { method: "get" }
) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const token = authStore.token;
  let data = [];
  let error = null;
  let status_code = null;
  let success = false;
  var params: FormData | string = JSON.stringify(body);

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (fileUpload) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(body)) {
      if (value != null && !(value instanceof File) && typeof value === 'object') {

        // handle files
        if (key == 'files') {
          for (let i = 0; i < value.length; i++) {
            formData.append('files', value[i]);
          }
        } else {
          formData.append(key, JSON.stringify(value));
        }
      } else if (value != null) {
        formData.append(key, value);
      }
    }
    params = formData;
  }

  let options = {
    method,
    headers,
    body: method.toUpperCase() === "GET" ? undefined : params,
  };

  try {
    const response: any = await $fetch(url, options);
    data = response;
    success = true;
  } catch (e: any) {
    switch(e.statusCode) {
      case 401:
        navigateTo(
            '/login',
            { replace: true }
        );
        break;
      default:
        if (e.data?.message) {
          error = e.data?.message;
        }
        else if (e.data.errors) {
          error = e.data.errors;
        }
        else if (e.statusMessage) {
          error = e.statusMessage;
        }
        status_code = e.statusCode
    }
    success = false;
  }
  const response =  {
    data,
    status_code,
    error,
    success,
  };

  handleError(response, overrideError);

  return response;
};

const handleError = (response: { error: any; status_code: any }, overrideError: boolean) => {
  if (!response.error) {
    return;
  }

  if (overrideError) {
    return;
  }

  switch (response.status_code) {
    case 400:
      if (typeof response.error === 'object') {
        handleValidationErrors(response.error);
        return;
      }
      toast.error(response.error);
      break;
    case 500:
      toast.error('Something went wrong while trying to process your request');
      break;
    case 403:
      toast.error('You might not have permission for this action');
      break;
    case 404:
      toast.error(response.error);
      break;
    default:
      break;
  }
}

const handleValidationErrors = (error: any) => {
  let message = "";
  const errorKeys = Object.keys(error);

  errorKeys.forEach(key => {
    const errorMessages = error[key];
    errorMessages.forEach((errorMessage: any) => {
      message = message + `\n- ${errorMessage}`
    });
  });
  toast.error(message);
}