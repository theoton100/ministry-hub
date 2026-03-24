import DashboardLayout from "@/components/DashboardLayout";
import { Route, Switch } from "wouter";
import AdminBlogList from "./admin/AdminBlogList";
import AdminBlogEditor from "./admin/AdminBlogEditor";
import AdminSermons from "./admin/AdminSermons";
import AdminPodcasts from "./admin/AdminPodcasts";
import AdminBooks from "./admin/AdminBooks";
import AdminOrders from "./admin/AdminOrders";
import AdminOverview from "./admin/AdminOverview";

export default function Admin() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/admin/blog/new" component={AdminBlogEditor} />
        <Route path="/admin/blog/edit/:id" component={AdminBlogEditor} />
        <Route path="/admin/blog" component={AdminBlogList} />
        <Route path="/admin" component={AdminOverview} />
        <Route path="/admin/sermons" component={AdminSermons} />
        <Route path="/admin/podcasts" component={AdminPodcasts} />
        <Route path="/admin/books" component={AdminBooks} />
        <Route path="/admin/orders" component={AdminOrders} />
        <Route component={AdminOverview} />
      </Switch>
    </DashboardLayout>
  );
}
