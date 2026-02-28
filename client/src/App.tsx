import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import Home from "@/pages/Home";
import Podcast from "@/pages/Podcast";
import Devotionals from "@/pages/Devotionals";
import GenAlpha from "@/pages/GenAlpha";
import PostDetail from "@/pages/PostDetail";
import Photos from "@/pages/Photos";
import About from "@/pages/About";
import Subscribe from "@/pages/Subscribe";
import Admin from "@/pages/Admin";
import Subscribers from "@/pages/Subscribers";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/devotionals" component={Devotionals} />
      <Route path="/devotionals/:slug" component={PostDetail} />
      <Route path="/blog" component={Podcast} />
      <Route path="/blog/:slug" component={PostDetail} />
      <Route path="/gen-alpha" component={GenAlpha} />
      <Route path="/gen-alpha/:slug" component={PostDetail} />
      <Route path="/podcast" component={Podcast} />
      <Route path="/podcast/:slug" component={PostDetail} />
      <Route path="/photos" component={Photos} />
      <Route path="/about" component={About} />
      <Route path="/subscribe" component={Subscribe} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin/subscribers" component={Subscribers} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
