"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TitleGroup } from "@/components/blocks/title-group";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  RefreshCw,
  Send,
  Paperclip,
  Video,
  Link2,
  MoreHorizontal,
  Play
} from "lucide-react";
import { AVATAR_ETHAN_BROOKS, AVATAR_MARCUS_WEBB, AVATAR_NICOLE_PALMER, AVATAR_SARAH_CHEN } from "@/components/blocks/demo-avatars";

// ============================================
// Types
// ============================================

export interface PostAuthor {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface LinkPreview {
  url: string;
  domain: string;
  title: string;
  description?: string;
  imageUrl?: string;
}

export interface VideoMedia {
  thumbnailUrl: string;
  videoUrl?: string;
}

export interface RepostContent {
  author: PostAuthor;
  date: string;
  content: string;
  images?: string[];
}

export interface SocialFeedPost {
  id: string;
  author: PostAuthor;
  date: string;
  content: string;
  /** Image URLs for the post */
  images?: string[];
  /** Video media */
  video?: VideoMedia;
  /** Link preview card */
  linkPreview?: LinkPreview;
  /** Reposted/quoted content */
  repost?: RepostContent;
  likesCount: number;
  repliesCount: number;
  isLiked?: boolean;
  /** Nested replies */
  replies?: SocialFeedPost[];
  /** Whether this is a reply (for indentation) */
  isReply?: boolean;
}

export interface SocialFeedProps {
  /** Section title */
  title?: string;
  /** Posts data */
  posts?: SocialFeedPost[];
  /** Current user for composer */
  currentUser?: PostAuthor;
  /** Placeholder text for composer */
  composerPlaceholder?: string;
  /** Image preview in composer */
  composerImagePreview?: string;
  /** Callback when post is submitted */
  onPost?: (content: string) => void;
  /** Callback when like is clicked */
  onLike?: (postId: string) => void;
  /** Callback when comment is clicked */
  onComment?: (postId: string) => void;
  /** Callback when repost is clicked */
  onRepost?: (postId: string) => void;
  /** Callback when share is clicked */
  onShare?: (postId: string) => void;
  /** Callback when menu is clicked */
  onMenuClick?: (postId: string) => void;
  /** Additional class names */
  className?: string;
}

// ============================================
// Default Data
// ============================================

const defaultCurrentUser: PostAuthor = {
  id: "current",
  name: "You",
  avatarUrl: AVATAR_NICOLE_PALMER,
};

const defaultPosts: SocialFeedPost[] = [
  {
    id: "1",
    author: {
      id: "ethan",
      name: "Ethan Brooks",
      avatarUrl: AVATAR_ETHAN_BROOKS,
    },
    date: "Feb 23, 1:32 PM",
    content: "Thinking about traveling to Paris again!",
    repost: {
      author: {
        id: "marcus",
        name: "Marcus Webb",
        avatarUrl: AVATAR_MARCUS_WEBB,
      },
      date: "Nov 23, 5:34 PM",
      content: "What a place, the history, architecture and culture is wonderful. So many sites to see, one more amazing then the next. A must see if you are going to visit the great cities of the world.",
      images: [
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=320&h=320&fit=crop",
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=320&h=320&fit=crop",
      ],
    },
    likesCount: 30,
    repliesCount: 10,
    isLiked: false,
  },
  {
    id: "2",
    author: {
      id: "nicole",
      name: "Nicole Palmer",
      avatarUrl: AVATAR_NICOLE_PALMER,
    },
    date: "Feb 23, 1:32 PM",
    content: "Learning how to Bubble",
    video: {
      thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=480&h=380&fit=crop",
    },
    likesCount: 30,
    repliesCount: 10,
    isLiked: false,
    replies: [
      {
        id: "2-reply-1",
        author: {
          id: "sarah",
          name: "Sarah Chen",
          avatarUrl: AVATAR_SARAH_CHEN,
        },
        date: "Mar 12, 11:23 AM",
        content: "Check out these flight deals to Paris!",
        linkPreview: {
          url: "https://expedia.com/flights/paris",
          domain: "expedia.com",
          title: "Paris flights",
          description: "Your one-stop travel site for your dream vacation. Bundle your stay...",
          imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200&h=200&fit=crop",
        },
        likesCount: 30,
        repliesCount: 10,
        isLiked: false,
        isReply: true,
      },
    ],
  },
];

// ============================================
// Sub-components
// ============================================

interface PostComposerProps {
  placeholder?: string;
  imagePreview?: string;
  onPost?: (content: string) => void;
}

function PostComposer({ placeholder = "What's on your mind?", imagePreview, onPost }: PostComposerProps) {
  const [content, setContent] = useState("");

  const handlePost = () => {
    if (content.trim() || imagePreview) {
      onPost?.(content);
      setContent("");
    }
  };

  return (
    <div
      className="flex flex-col w-full overflow-hidden"
      style={{
        border: "1px solid var(--canvas-border)",
        boxShadow: "0px 1px 8px 0px rgba(0,0,0,0.03)",
      }}
    >
      {/* Text input area */}
      <div
        className="w-full"
        style={{
          padding: "var(--spacing-xl)",
          background: "var(--canvas-background)",
          boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.02)",
        }}
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="w-full resize-none border-0 bg-transparent outline-none"
          rows={2}
          style={{
            fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
            fontSize: "var(--typo-body-s-size)",
            lineHeight: "var(--typo-body-s-line-height)",
            color: content ? "var(--canvas-text)" : "var(--canvas-text-placeholder)",
          }}
        />
      </div>

      {/* Image preview */}
      {imagePreview && (
        <div
          className="w-full"
          style={{
            padding: "0 var(--spacing-xl)",
            background: "var(--canvas-background)",
          }}
        >
          <div
            className="overflow-hidden"
            style={{
              width: 240,
              height: 180,
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--canvas-border)",
            }}
          >
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Action bar */}
      <div
        className="flex items-center justify-between w-full"
        style={{
          padding: "var(--spacing-xl)",
          background: "var(--canvas-background)",
          borderTop: "1px solid var(--canvas-border)",
        }}
      >
        <div className="flex items-center" style={{ gap: "var(--spacing-lg)" }}>
          <button type="button" className="cursor-pointer" style={{ color: "var(--canvas-text)" }}>
            <Paperclip className="w-5 h-5" />
          </button>
          <button type="button" className="cursor-pointer" style={{ color: "var(--canvas-text)" }}>
            <Video className="w-5 h-5" />
          </button>
          <button type="button" className="cursor-pointer" style={{ color: "var(--canvas-text)" }}>
            <Link2 className="w-5 h-5" />
          </button>
        </div>
        <Button variant="primary" size="sm" onClick={handlePost}>
          Post
        </Button>
      </div>
    </div>
  );
}

interface ActionIconsRowProps {
  isLiked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onRepost?: () => void;
  onShare?: () => void;
}

function ActionIconsRow({ isLiked, onLike, onComment, onRepost, onShare }: ActionIconsRowProps) {
  return (
    <div
      className="flex items-center"
      style={{ gap: "var(--spacing-lg)", padding: "var(--spacing-xxs) 0" }}
    >
      <button
        type="button"
        onClick={onLike}
        className="cursor-pointer"
        style={{ color: isLiked ? "var(--canvas-destructive)" : "var(--canvas-text)" }}
      >
        <Heart
          className="w-5 h-5"
          style={{
            fill: isLiked ? "var(--canvas-destructive)" : "transparent",
          }}
        />
      </button>
      <button type="button" onClick={onComment} className="cursor-pointer" style={{ color: "var(--canvas-text)" }}>
        <MessageCircle className="w-5 h-5" />
      </button>
      <button type="button" onClick={onRepost} className="cursor-pointer" style={{ color: "var(--canvas-text)" }}>
        <RefreshCw className="w-5 h-5" />
      </button>
      <button type="button" onClick={onShare} className="cursor-pointer" style={{ color: "var(--canvas-text)" }}>
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}

interface StatsRowProps {
  likesCount: number;
  repliesCount: number;
}

function StatsRow({ likesCount, repliesCount }: StatsRowProps) {
  return (
    <div
      className="flex items-center"
      style={{ gap: "var(--spacing-xl)", paddingTop: "var(--spacing-xs)" }}
    >
      <span
        style={{
          fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
          fontSize: "var(--typo-body-s-size)",
          fontWeight: 500,
          lineHeight: "var(--typo-body-s-line-height)",
          color: "var(--canvas-text-placeholder)",
        }}
      >
        {likesCount} likes
      </span>
      <span
        style={{
          fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
          fontSize: "var(--typo-body-s-size)",
          fontWeight: 500,
          lineHeight: "var(--typo-body-s-line-height)",
          color: "var(--canvas-text-placeholder)",
        }}
      >
        {repliesCount} replies
      </span>
    </div>
  );
}

interface VideoThumbnailProps {
  thumbnailUrl: string;
  onClick?: () => void;
}

function VideoThumbnail({ thumbnailUrl, onClick }: VideoThumbnailProps) {
  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      style={{
        width: 480,
        height: 380,
        maxWidth: "100%",
        borderRadius: "var(--radius-3xl)",
        border: "1px solid var(--canvas-border)",
      }}
      onClick={onClick}
    >
      <img
        src={thumbnailUrl}
        alt="Video thumbnail"
        className="w-full h-full object-cover"
      />
      {/* Play button */}
      <div
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: 128,
            height: 80,
            background: "var(--canvas-destructive)",
            borderRadius: "var(--radius-2xl)",
          }}
        >
          <Play className="w-12 h-12 text-white fill-white" />
        </div>
      </div>
    </div>
  );
}

interface LinkPreviewCardProps {
  linkPreview: LinkPreview;
  onClick?: () => void;
}

function LinkPreviewCard({ linkPreview, onClick }: LinkPreviewCardProps) {
  return (
    <div
      className="flex overflow-hidden cursor-pointer"
      style={{
        width: 580,
        maxWidth: "100%",
        background: "var(--canvas-background)",
        border: "1px solid var(--canvas-border)",
        borderRadius: "var(--radius-2xl)",
        boxShadow: "0px 1px 8px 0px rgba(0,0,0,0.03)",
      }}
      onClick={onClick}
    >
      {linkPreview.imageUrl && (
        <div
          className="shrink-0 self-stretch overflow-hidden"
          style={{
            width: 200,
            borderRight: "1px solid var(--canvas-border)",
            borderTopLeftRadius: "var(--radius-md)",
            borderBottomLeftRadius: "var(--radius-md)",
          }}
        >
          <img
            src={linkPreview.imageUrl}
            alt={linkPreview.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div
        className="flex flex-col flex-1"
        style={{ padding: "var(--spacing-4xl)", gap: "var(--spacing-lg)" }}
      >
        <div className="flex flex-col" style={{ gap: 0 }}>
          <span
            style={{
              fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
              fontSize: "var(--typo-body-s-size)",
              lineHeight: "var(--typo-body-s-line-height)",
              color: "var(--canvas-text-placeholder)",
            }}
          >
            {linkPreview.domain}
          </span>
          <span
            style={{
              fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
              fontSize: "var(--typo-body-s-size)",
              fontWeight: 600,
              lineHeight: "var(--typo-body-s-line-height)",
              color: "var(--canvas-text)",
            }}
          >
            {linkPreview.title}
          </span>
        </div>
        {linkPreview.description && (
          <p
            style={{
              fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
              fontSize: "var(--typo-body-s-size)",
              lineHeight: "var(--typo-body-s-line-height)",
              color: "var(--canvas-text)",
              margin: 0,
            }}
          >
            {linkPreview.description}
          </p>
        )}
      </div>
    </div>
  );
}

interface RepostCardProps {
  repost: RepostContent;
  onLike?: () => void;
  onComment?: () => void;
  onRepost?: () => void;
  onShare?: () => void;
}

function RepostCard({ repost, onLike, onComment, onRepost, onShare }: RepostCardProps) {
  return (
    <div
      className="flex flex-col w-full"
      style={{
        padding: "var(--spacing-4xl)",
        background: "var(--canvas-background)",
        border: "1px solid var(--canvas-border)",
        borderRadius: "var(--radius-md)",
        boxShadow: "0px 1px 8px 0px rgba(0,0,0,0.03)",
        gap: "var(--spacing-xl)",
      }}
    >
      {/* Author row */}
      <div className="flex items-start w-full" style={{ gap: "var(--spacing-xl)" }}>
        <Avatar
          className="shrink-0"
          style={{
            width: 48,
            height: 48,
            borderRadius: "var(--spacing-3xl)",
            border: "1px solid var(--canvas-border)",
          }}
        >
          <AvatarImage src={repost.author.avatarUrl} />
          <AvatarFallback>
            {repost.author.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-1" style={{ gap: "var(--spacing-lg)" }}>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col" style={{ gap: 0 }}>
              <span
                style={{
                  fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
                  fontSize: "var(--typo-body-s-size)",
                  fontWeight: 600,
                  lineHeight: "var(--typo-body-s-line-height)",
                  color: "var(--canvas-text)",
                }}
              >
                {repost.author.name}
              </span>
              <span
                style={{
                  fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
                  fontSize: "var(--typo-body-s-size)",
                  lineHeight: "var(--typo-body-s-line-height)",
                  color: "var(--canvas-text-placeholder)",
                }}
              >
                {repost.date}
              </span>
            </div>
            <button
              type="button"
              className="cursor-pointer flex items-center justify-center"
              style={{
                width: 32,
                height: 32,
                borderRadius: "var(--spacing-6xl)",
                color: "var(--canvas-text-placeholder)",
              }}
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          {/* Content */}
          <p
            style={{
              fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
              fontSize: "var(--typo-body-s-size)",
              lineHeight: "var(--typo-body-s-line-height)",
              color: "var(--canvas-text)",
              margin: 0,
            }}
          >
            {repost.content}
          </p>
          {/* Images */}
          {repost.images && repost.images.length > 0 && (
            <div className="flex" style={{ gap: "var(--spacing-xl)" }}>
              {repost.images.map((img, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden"
                  style={{
                    width: 320,
                    height: 320,
                    borderRadius: "var(--radius-2xl)",
                    border: "1px solid var(--canvas-border)",
                  }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
          {/* Actions */}
          <ActionIconsRow
            isLiked={false}
            onLike={onLike}
            onComment={onComment}
            onRepost={onRepost}
            onShare={onShare}
          />
          <StatsRow likesCount={30} repliesCount={10} />
        </div>
      </div>
    </div>
  );
}

interface PostCellProps {
  post: SocialFeedPost;
  onLike?: () => void;
  onComment?: () => void;
  onRepost?: () => void;
  onShare?: () => void;
  onMenuClick?: () => void;
}

function PostCell({ post, onLike, onComment, onRepost, onShare, onMenuClick }: PostCellProps) {
  return (
    <div
      className="flex w-full"
      style={{
        paddingLeft: post.isReply ? "var(--spacing-7xl)" : 0,
        paddingTop: post.isReply ? "var(--spacing-3xl)" : "var(--spacing-xl)",
        paddingBottom: post.isReply ? 0 : "var(--spacing-3xl)",
        borderBottom: post.isReply ? "none" : "1px solid var(--canvas-border)",
        gap: "var(--spacing-xl)",
      }}
    >
      {/* Avatar column with reply line */}
      <div className="flex flex-col items-center shrink-0" style={{ gap: "var(--spacing-md)" }}>
        <Avatar
          style={{
            width: 48,
            height: 48,
            borderRadius: "var(--spacing-3xl)",
            border: "1px solid var(--canvas-border)",
          }}
        >
          <AvatarImage src={post.author.avatarUrl} />
          <AvatarFallback>
            {post.author.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        {/* Reply line */}
        {post.replies && post.replies.length > 0 && (
          <div
            className="flex-1 w-px"
            style={{ background: "var(--canvas-border)", minHeight: 20 }}
          />
        )}
      </div>

      {/* Content column */}
      <div className="flex flex-col flex-1 min-w-0" style={{ gap: "var(--spacing-lg)" }}>
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col" style={{ gap: 0 }}>
            <span
              style={{
                fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
                fontSize: "var(--typo-body-s-size)",
                fontWeight: 600,
                lineHeight: "var(--typo-body-s-line-height)",
                color: "var(--canvas-text)",
              }}
            >
              {post.author.name}
            </span>
            <span
              style={{
                fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
                fontSize: "var(--typo-body-s-size)",
                lineHeight: "var(--typo-body-s-line-height)",
                color: "var(--canvas-text-placeholder)",
              }}
            >
              {post.date}
            </span>
          </div>
          <button
            type="button"
            onClick={onMenuClick}
            className="cursor-pointer flex items-center justify-center"
            style={{
              width: 32,
              height: 32,
              borderRadius: "var(--spacing-6xl)",
              color: "var(--canvas-text-placeholder)",
            }}
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Content text */}
        <p
          style={{
            fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
            fontSize: "var(--typo-body-s-size)",
            lineHeight: "var(--typo-body-s-line-height)",
            color: "var(--canvas-text)",
            margin: 0,
          }}
        >
          {post.content}
        </p>

        {/* Repost card */}
        {post.repost && (
          <RepostCard
            repost={post.repost}
            onLike={onLike}
            onComment={onComment}
            onRepost={onRepost}
            onShare={onShare}
          />
        )}

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className="flex" style={{ gap: "var(--spacing-xl)" }}>
            {post.images.map((img, idx) => (
              <div
                key={idx}
                className="overflow-hidden"
                style={{
                  width: 320,
                  height: 320,
                  borderRadius: "var(--radius-2xl)",
                  border: "1px solid var(--canvas-border)",
                }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Video */}
        {post.video && (
          <VideoThumbnail thumbnailUrl={post.video.thumbnailUrl} />
        )}

        {/* Link preview */}
        {post.linkPreview && (
          <LinkPreviewCard linkPreview={post.linkPreview} />
        )}

        {/* Actions */}
        <ActionIconsRow
          isLiked={post.isLiked}
          onLike={onLike}
          onComment={onComment}
          onRepost={onRepost}
          onShare={onShare}
        />

        {/* Stats */}
        <StatsRow likesCount={post.likesCount} repliesCount={post.repliesCount} />

        {/* Nested replies */}
        {post.replies && post.replies.length > 0 && (
          <div className="flex flex-col w-full">
            {post.replies.map((reply) => (
              <PostCell
                key={reply.id}
                post={reply}
                onLike={onLike}
                onComment={onComment}
                onRepost={onRepost}
                onShare={onShare}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// Main Component
// ============================================

/**
 * Canvas Design System - Social Feed Block
 *
 * A social media-style feed component with post composer, posts with various
 * content types (text, images, video, reposts, link cards), social interactions,
 * and threaded replies.
 *
 * @example
 * ```tsx
 * <SocialFeed
 *   title="Social Feed"
 *   posts={[...]}
 *   onLike={(postId) => console.log("Liked", postId)}
 *   onPost={(content) => console.log("Posted", content)}
 * />
 * ```
 */
export function SocialFeed({
  title = "Social Feed",
  posts = defaultPosts,
  currentUser = defaultCurrentUser,
  composerPlaceholder = "What's on your mind?",
  composerImagePreview,
  onPost,
  onLike,
  onComment,
  onRepost,
  onShare,
  onMenuClick,
  className,
}: SocialFeedProps) {
  return (
    <div
      className={cn("flex flex-col w-full", className)}
      style={{ gap: "var(--spacing-xl)" }}
    >
      {/* Header Section */}
      {title && <TitleGroup title={title} />}

      {/* Feed content */}
      <div className="flex flex-col w-full overflow-hidden">
        {/* First section: Composer + first set of posts */}
        <div
          className="flex flex-col w-full"
          style={{
            borderBottom: "1px solid var(--canvas-border)",
            paddingBottom: "var(--spacing-5xl)",
          }}
        >
          {/* Post Composer */}
          <PostComposer
            placeholder={composerPlaceholder}
            imagePreview={composerImagePreview}
            onPost={onPost}
          />

          {/* Posts */}
          <div className="flex flex-col w-full" style={{ paddingTop: "var(--spacing-xl)" }}>
            {posts.map((post) => (
              <PostCell
                key={post.id}
                post={post}
                onLike={() => onLike?.(post.id)}
                onComment={() => onComment?.(post.id)}
                onRepost={() => onRepost?.(post.id)}
                onShare={() => onShare?.(post.id)}
                onMenuClick={() => onMenuClick?.(post.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
