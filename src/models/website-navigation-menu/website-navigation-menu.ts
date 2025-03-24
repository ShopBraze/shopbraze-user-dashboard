type WebsiteNavigationMenuType = {
  id: string;
  short_id: string;
  title: string;
  link: string;
  parent_short_id?: string;
  is_visible: boolean;
  children: WebsiteNavigationMenuType[];
};
