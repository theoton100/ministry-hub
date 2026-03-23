import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { FileText, Video, Headphones, Plus, ArrowRight, ExternalLink } from "lucide-react";

export default function AdminOverview() {
  const { data: blogs } = trpc.blog.listAll.useQuery();
  const { data: sermons } = trpc.sermon.listAll.useQuery();
  const { data: podcasts } = trpc.podcast.listAll.useQuery();

  const stats = [
    { icon: FileText, label: "Blog Posts", count: blogs?.length ?? 0, href: "/admin/blog", color: "bg-blue-50 text-blue-600" },
    { icon: Video, label: "Sermons", count: sermons?.length ?? 0, href: "/admin/sermons", color: "bg-red-50 text-red-600" },
    { icon: Headphones, label: "Podcasts", count: podcasts?.length ?? 0, href: "/admin/podcasts", color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-sans text-2xl md:text-3xl font-bold">Ministry Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your blog, sermons, and podcast episodes.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-border/50">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.count}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-sans text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/admin/blog/new">
            <Button variant="outline" className="w-full justify-start gap-3 h-14 text-left">
              <Plus className="h-5 w-5 text-blue-600" />
              <span>Write New Blog Post</span>
            </Button>
          </Link>
          <Link href="/admin/sermons">
            <Button variant="outline" className="w-full justify-start gap-3 h-14 text-left">
              <Plus className="h-5 w-5 text-red-600" />
              <span>Add New Sermon</span>
            </Button>
          </Link>
          <Link href="/admin/podcasts">
            <Button variant="outline" className="w-full justify-start gap-3 h-14 text-left">
              <Plus className="h-5 w-5 text-purple-600" />
              <span>Add Podcast Episode</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* View Site */}
      <div className="pt-4">
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ExternalLink className="h-4 w-4" /> View Public Site
          </Button>
        </Link>
      </div>
    </div>
  );
}
