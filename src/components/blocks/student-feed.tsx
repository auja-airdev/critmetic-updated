"use client";

import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Link2, MessageSquare } from "lucide-react";

// ============================================
// Types
// ============================================

export interface FeedPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  timestamp: string;
  content: string;
  linkLabel?: string;
  linkUrl?: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
}

export interface StudentFeedProps {
  title?: string;
  posts?: FeedPost[];
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onLinkClick?: (postId: string, url: string) => void;
  onSeeMore?: () => void;
}

// ============================================
// Default Data
// ============================================

const defaultPosts: FeedPost[] = [
  {
    id: "1",
    authorName: "Katherine Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    timestamp: "5h",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    linkLabel: "Open Link",
    linkUrl: "#",
    likesCount: 16,
    commentsCount: 8,
    sharesCount: 4,
  },
  {
    id: "2",
    authorName: "Katherine Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    timestamp: "5h",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    linkLabel: "Open Youtube",
    linkUrl: "#",
    likesCount: 16,
    commentsCount: 8,
    sharesCount: 4,
  },
  {
    id: "3",
    authorName: "Katherine Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    timestamp: "5h",
    content: "Consectetur sapien elementum mollis tempus ultricies pulvinar ligula lobortis nisi?",
    linkLabel: "Open Tiktok",
    linkUrl: "#",
    likesCount: 16,
    commentsCount: 8,
    sharesCount: 4,
  },
];

// ============================================
// Feed Post Card
// ============================================

function FeedPostCard({
  post,
  onLike,
  onComment,
  onShare,
  onLinkClick,
}: {
  post: FeedPost;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onLinkClick?: () => void;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-md)] border border-[var(--canvas-border)]",
        "bg-[var(--canvas-surface)]",
        "p-[var(--spacing-xl)]",
        "flex flex-col gap-[var(--spacing-lg)]"
      )}
    >
      {/* Author Row */}
      <div className="flex items-center gap-[var(--spacing-md)]">
        <Avatar className="size-9">
          <AvatarImage src={post.authorAvatar} alt={post.authorName} />
          <AvatarFallback className="bg-[var(--canvas-neutral-surface)] text-[var(--canvas-neutral-text)]">
            {post.authorName.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-[var(--spacing-sm)]">
          <span
            style={{
              fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
              fontSize: "var(--typo-body-s-size)",
              fontWeight: 600,
              lineHeight: "var(--typo-body-s-line-height)",
              color: "var(--canvas-text)",
            }}
          >
            {post.authorName}
          </span>
          <span
            style={{
              fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
              fontSize: "var(--typo-body-s-size)",
              fontWeight: 400,
              lineHeight: "var(--typo-body-s-line-height)",
              color: "var(--canvas-neutral-text)",
            }}
          >
            · {post.timestamp}
          </span>
        </div>
      </div>

      {/* Content */}
      <Typography variant="body-s">{post.content}</Typography>

      {/* Link Button */}
      {post.linkLabel && (
        <Button
          variant="outline"
          size="sm"
          onClick={onLinkClick}
          className="self-start"
        >
          <Link2 className="size-3.5 mr-[var(--spacing-sm)]" />
          {post.linkLabel}
        </Button>
      )}

      {/* Interaction Bar */}
      <div className="flex items-center gap-[var(--spacing-xl)]">
        <button
          onClick={onLike}
          className={cn(
            "cursor-pointer flex items-center gap-[var(--spacing-xs)] transition-colors",
            post.isLiked ? "text-[var(--canvas-destructive)]" : "text-[var(--canvas-neutral-text)] hover:text-[var(--canvas-text)]"
          )}
        >
          <Heart className={cn("size-4", post.isLiked && "fill-current")} />
          <span
            style={{
              fontFamily: "var(--typo-body-xs-font, var(--typo-global-font))",
              fontSize: "var(--typo-body-xs-size)",
              fontWeight: 400,
            }}
          >
            {post.likesCount}
          </span>
        </button>
        <button
          onClick={onComment}
          className="cursor-pointer flex items-center gap-[var(--spacing-xs)] text-[var(--canvas-neutral-text)] hover:text-[var(--canvas-text)] transition-colors"
        >
          <MessageCircle className="size-4" />
          <span
            style={{
              fontFamily: "var(--typo-body-xs-font, var(--typo-global-font))",
              fontSize: "var(--typo-body-xs-size)",
              fontWeight: 400,
            }}
          >
            {post.commentsCount}
          </span>
        </button>
        <button
          onClick={onShare}
          className="cursor-pointer flex items-center gap-[var(--spacing-xs)] text-[var(--canvas-neutral-text)] hover:text-[var(--canvas-text)] transition-colors"
        >
          <Share2 className="size-4" />
          <span
            style={{
              fontFamily: "var(--typo-body-xs-font, var(--typo-global-font))",
              fontSize: "var(--typo-body-xs-size)",
              fontWeight: 400,
            }}
          >
            {post.sharesCount}
          </span>
        </button>
      </div>
    </div>
  );
}

// ============================================
// Student Feed
// ============================================

export function StudentFeed({
  title = "Feed",
  posts = defaultPosts,
  onLike,
  onComment,
  onShare,
  onLinkClick,
  onSeeMore,
}: StudentFeedProps) {
  return (
    <div className="flex flex-col gap-[var(--spacing-xl)]">
      {/* Header */}
      <div className="flex items-center gap-[var(--spacing-md)]">
        <MessageSquare className="size-5" style={{ color: "var(--canvas-text)" }} />
        <Typography variant="h5">{title}</Typography>
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-[var(--spacing-md)]">
        {posts.map((post) => (
          <FeedPostCard
            key={post.id}
            post={post}
            onLike={() => onLike?.(post.id)}
            onComment={() => onComment?.(post.id)}
            onShare={() => onShare?.(post.id)}
            onLinkClick={() => onLinkClick?.(post.id, post.linkUrl || "#")}
          />
        ))}
      </div>

      {/* See More */}
      {onSeeMore && (
        <Button variant="outline" size="sm" className="w-full" onClick={onSeeMore}>
          See more posts
        </Button>
      )}
    </div>
  );
}
