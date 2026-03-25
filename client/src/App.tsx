import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Listen from "./pages/Listen";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Newsletter from "./pages/Newsletter";
import Store from "./pages/Store";
import Give from "./pages/Give";
import PaymentVerify from "./pages/PaymentVerify";
import AdminLogin from "./pages/AdminLogin";
import AdminGuard from "./components/AdminGuard";
import DashboardLayout from "./components/DashboardLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminBlogList from "./pages/admin/AdminBlogList";
import AdminBlogEditor from "./pages/admin/AdminBlogEditor";
import AdminSermons from "./pages/admin/AdminSermons";
import AdminPodcasts from "./pages/admin/AdminPodcasts";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminOrders from "./pages/admin/AdminOrders";

// Wrapper components to handle AdminGuard + DashboardLayout
const AdminDashboard: React.FC = () => (
  <AdminGuard>
    <DashboardLayout>
      <AdminOverview />
    </DashboardLayout>
  </AdminGuard>
);

const AdminBlogListPage: React.FC = () => (
  <AdminGuard>
    <DashboardLayout>
      <AdminBlogList />
    </DashboardLayout>
  </AdminGuard>
);

const AdminBlogNewPage: React.FC = () => (
  <AdminGuard>
    <DashboardLayout>
      <AdminBlogEditor />
    </DashboardLayout>
  </AdminGuard>
);

const AdminBlogEditPage: React.FC = () => (
  <AdminGuard>
    <DashboardLayout>
      <AdminBlogEditor />
    </DashboardLayout>
  </AdminGuard>
);

const AdminSermonsPage: React.FC = () => (
  <AdminGuard>
    <DashboardLayout>
      <AdminSermons />
    </DashboardLayout>
  </AdminGuard>
);

const AdminPodcastsPage: React.FC = () => (
  <AdminGuard>
    <DashboardLayout>
      <AdminPodcasts />
    </DashboardLayout>
  </AdminGuard>
);

const AdminBooksPage: React.FC = () => (
  <AdminGuard>
    <DashboardLayout>
      <AdminBooks />
    </DashboardLayout>
  </AdminGuard>
);

const AdminOrdersPage: React.FC = () => (
  <AdminGuard>
    <DashboardLayout>
      <AdminOrders />
    </DashboardLayout>
  </AdminGuard>
);

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Home} />
      <Route path="/watch" component={Watch} />
      <Route path="/listen" component={Listen} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/about" component={About} />
      <Route path="/newsletter" component={Newsletter} />
      <Route path="/store" component={Store} />
      <Route path="/give" component={Give} />
      <Route path="/payment/verify" component={PaymentVerify} />
      <Route path="/admin/login" component={AdminLogin} />

      {/* Admin routes - specific routes BEFORE generic routes */}
      <Route path="/admin/blog/new" component={AdminBlogNewPage} />
      <Route path="/admin/blog/edit/:id" component={AdminBlogEditPage} />
      <Route path="/admin/blog" component={AdminBlogListPage} />
      <Route path="/admin/sermons" component={AdminSermonsPage} />
      <Route path="/admin/podcasts" component={AdminPodcastsPage} />
      <Route path="/admin/books" component={AdminBooksPage} />
      <Route path="/admin/orders" component={AdminOrdersPage} />
      <Route path="/admin" component={AdminDashboard} />

      {/* 404 fallback */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
