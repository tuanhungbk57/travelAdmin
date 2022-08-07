import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  toggled = true;
  _hasBackgroundImage = true;
  menusbackup = [
    {
      title: 'general',
      type: 'header'
    },
    {
      title: 'Trang chủ',
      icon: 'bi bi-house-heart-fill',
      active: false,
      type: 'dropdown',
      badge: {
        text: 'New ',
        class: 'badge-warning'
      },
      submenus: [
        {
          title: 'Dashboard 1',
          badge: {
            text: 'Pro ',
            class: 'badge-success'
          }
        },
        {
          title: 'Dashboard 2'
        },
        {
          title: 'Dashboard 3'
        }
      ]
    },
    {
      title: 'E-commerce',
      icon: 'fa fa-shopping-cart',
      active: false,
      type: 'dropdown',
      badge: {
        text: '3',
        class: 'badge-danger'
      },
      submenus: [
        {
          title: 'Products',
        },
        {
          title: 'Orders'
        },
        {
          title: 'Credit cart'
        }
      ]
    },
    {
      title: 'Components',
      icon: 'far fa-gem',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'General',
        },
        {
          title: 'Panels'
        },
        {
          title: 'Tables'
        },
        {
          title: 'Icons'
        },
        {
          title: 'Forms'
        }
      ]
    },
    {
      title: 'Charts',
      icon: 'fa fa-chart-line',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Pie chart',
        },
        {
          title: 'Line chart'
        },
        {
          title: 'Bar chart'
        },
        {
          title: 'Histogram'
        }
      ]
    },
    {
      title: 'Maps',
      icon: 'fa fa-globe',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Google maps',
        },
        {
          title: 'Open street map'
        }
      ]
    },
    {
      title: 'Extra',
      type: 'header'
    },
    {
      title: 'Documentation',
      icon: 'fa fa-book',
      active: false,
      type: 'simple',
      badge: {
        text: 'Beta',
        class: 'badge-primary'
      },
    },
    {
      title: 'Calendar',
      icon: 'fa fa-calendar',
      active: false,
      type: 'simple'
    },
    {
      title: 'Examples',
      icon: 'fa fa-folder',
      active: false,
      type: 'simple'
    }
  ];

  menus = [
    {
      title: 'Global Prestige Admin',
      type: 'header'
    },
    {
      title: 'Khách hàng',
      icon: 'bi bi-person-hearts',
      active: false,
      path:'customer/lead',
      type: 'dropdown',
      submenus: [
        {
          title: 'Khách đặt chỗ',
          path:'customer/lead'
        },
        {
          title: 'Khách đăng ký nhận bản tin',
          path:'customer/subscribe'
        }
      ]
    },
    {
      title: 'Thông tin chung',
      icon: 'bi bi-info-square-fill',
      active: false,
      path: 'info',
      type: 'dropdown',
      submenus: [
        {
          title: 'Thông tin công ty',
          path:'info'
        },
        {
          title: 'Nội dung sử dụng chung',
          path:'general'
        }
      ]
    },
    {
      title: 'Trang chủ',
      icon: 'bi bi-house-heart-fill',
      active: false,
      path: 'home',
      type: 'simple'
    },
    {
      title: 'Điểm đến',
      icon: 'bi bi-twitter',
      active: false,
      path: 'destination-info',
      type: 'dropdown',
      submenus: [
        {
          title: 'Trang thông tin giới thiệu',
          path:'destination-info'
        },
        {
          title: 'Thiết lập các điểm đến',
          path:'destination'
        }
      ]
    },
    {
      title: 'Các chuyến đi',
      icon: 'bi bi-signpost-split-fill',
      active: false,
      path: 'trip',
      type: 'simple'   
    },
    {
      title: 'Các tour du lịch',
      icon: 'bi bi-signpost-split-fill',
      active: false,
      path: 'tour',
      type: 'simple'   
    },
    {
      title: 'Hình ảnh',
      icon: 'bi bi-images',
      active: false,
      path:'setting/image/general',
      type: 'dropdown',
      submenus: [
        {
          title: 'Ảnh sử dụng chung',
          path:'setting/image/general'
        },
        {
          title: 'Ảnh các điểm đến',
          path:'setting/image'
        },
        {
          title: 'Ảnh các chuyến đi',
          path:'setting/image/trip'
        }
        // {
        //   title: 'Ảnh các tour',
        //   path:'setting/image/tour'
        // }
      ]
    },
    {
      title: 'Dịch vụ và liên hệ',
      icon: 'bi bi-stars',
      active: false,
      path:'service-contact',
      type: 'dropdown',
      submenus: [
        {
          title: 'Trang giới thiệu dịch vụ',
          path:'service-contact'
        },
        {
          title: 'Trang tiếp nhận thông tin khách hàng',
          path:'service-contact/communication'
        },
        {
          title: 'Trang đăng ký nhận bản tin',
          path:'service-contact/newsletter'
        }
        // {
        //   title: 'Đội ngũ cán bộ',
        //   path:'service-contact/my-team'
        // }
      ]
    }
    
   
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
