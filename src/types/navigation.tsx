export type MainStackParamList = {
  MainTabs: any;
  UserPage: undefined;
  NewPost: any;
  NewPostComplete: any;
  NewPostPublished: any;
  SinglePost: any;
  UserProfile: any;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgetPassword: undefined;
};

export type MainTabsParamList = {
  Home: undefined;
  Profile: undefined;
  About: undefined;
};

export type NewPostCompleteParamList = {
  postTitle: undefined;
  postContent: undefined;
  postImage: undefined;
  postType: undefined;
  postLatitude: undefined;
  postLongitude: undefined;
};
