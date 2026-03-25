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
        {/* Use relative paths - these will match against the /admin/:rest* pattern */}
        <Route path="/blog/new" component={AdminBlogEditor} />
        <Route path="/blog/edit/:id" component={AdminBlogEditor} />
        <Route path="/blog" component={AdminBlogList} />
        <Route path="/sermons" component={AdminSermons} />
        <Route path="/podcasts" component={AdminPodcasts} />
        <Route path="/books" component={AdminBooks} />
        <Route path="/orders" component={AdminOrders} />
        <Route path="/" component={AdminOverview} />
        <Route component={AdminOverview} />
      </Switch>
    </DashboardLayout>
  );
}
