const Menu = [
    {
      title: "Dashboard",
      group: "dashboard",
      component: "Dashboard",
      icon: "account_balance",
      href: "/dashboard"
    },
    { header: "Entradas" },    
    {
      title: "Cobrancas",
      group: "entradas",
      component: "Cobrancas",
      icon: "attach_money",
      href: "/cobrancas"
    },
    // {
    //   title: "Tasks",
    //   group: "tasks",
    //   component: "Tasks",
    //   icon: "playlist_add_check",
    //   href: "/tasks"
    // },
    { header: "Saidas" },
    {
      title: "Pagamentos",
      group: "routing",
      component: "pagamentos",
      icon: "money_off",
      href: "/pagamentos"
    },
    // {
    //   title: "Policies",
    //   group: "routing",
    //   component: "Policies",
    //   icon: "clear_all",
    //   href: "/policies"
    // },
    { header: "Clientes" },
    {
      title: "Clientes",
      group: "clientes",
      icon: "person",
      href: "/clientes",
      name: "Cliente"
    },
    // {
    //   title: "Team",
    //   group: "contacts",
    //   name: "Team",
    //   icon: "people",
    //   href: "/teams"
    // },
    // {
    //   title: "Service",
    //   group: "contacts",
    //   name: "Service",
    //   icon: "room_service",
    //   href: "/services"
    // },
    { header: "Extrato" },
    {
      title: "Extrato",
      group: "extratos",
      name: "Extrato",
      icon: "account_balance_wallet",
      href: "/extrato"
    },
    // {
    //   title: "Documents",
    //   group: "knowledge",
    //   name: "Documents",
    //   icon: "assignment",
    //   href: "/documents"
    // },
    // {
    //   title: "Terms",
    //   group: "knowledge",
    //   name: "Terms",
    //   icon: "layers",
    //   href: "/terms"
    // },
    // {
    //   title: "Definitions",
    //   group: "knowledge",
    //   name: "Defintitions",
    //   icon: "book",
    //   href: "/definitions"
    // },
    { header: "Configuracoes" },
    // {
    //   title: "Incident Types",
    //   group: "Configuration",
    //   name: "Incident Types",
    //   icon: "settings",
    //   href: "/incidents/types"
    // },
    // {
    //   title: "Incident Priorities",
    //   group: "Configuration",
    //   name: "Incident Priorities",
    //   icon: "report",
    //   href: "/incidents/priorities"
    // },
    {
      title: "Configuracoes",
      group: "configuracao",
      name: "Configuracoes",
      icon: "settings",
      href: "/configuracoes"
    }
  ]
  // reorder menu
  Menu.forEach(item => {
    if (item.items) {
      item.items.sort((x, y) => {
        let textA = x.title.toUpperCase()
        let textB = y.title.toUpperCase()
        return textA < textB ? -1 : textA > textB ? 1 : 0
      })
    }
  })
  
  export default Menu
  