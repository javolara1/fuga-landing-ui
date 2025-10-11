-- Create articles table for blog functionality
create table "public"."articles" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "content" text not null,
    "excerpt" text,
    "slug" text not null,
    "status" text default 'draft'::text,
    "author_id" uuid,
    "published_at" timestamp with time zone,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."articles" enable row level security;

-- Create indexes for performance
CREATE UNIQUE INDEX articles_pkey ON public.articles USING btree (id);
CREATE UNIQUE INDEX articles_slug_key ON public.articles USING btree (slug);
CREATE INDEX articles_status_idx ON public.articles USING btree (status);
CREATE INDEX articles_published_at_idx ON public.articles USING btree (published_at);
CREATE INDEX articles_author_id_idx ON public.articles USING btree (author_id);

-- Set primary key
alter table "public"."articles" add constraint "articles_pkey" PRIMARY KEY using index "articles_pkey";

-- Add unique constraint for slug
alter table "public"."articles" add constraint "articles_slug_key" UNIQUE using index "articles_slug_key";

-- Add foreign key constraint to profiles table
alter table "public"."articles" add constraint "articles_author_id_fkey" FOREIGN KEY (author_id) REFERENCES profiles(id) ON DELETE SET NULL not valid;
alter table "public"."articles" validate constraint "articles_author_id_fkey";

-- Add check constraint for status
alter table "public"."articles" add constraint "articles_status_check" CHECK ((status = ANY (ARRAY['draft'::text, 'published'::text])));

-- Create function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at
create trigger update_articles_updated_at before update on public.articles for each row execute function update_updated_at_column();

-- Row Level Security Policies

-- Policy: Anyone can read published articles
create policy "Anyone can view published articles"
on "public"."articles"
as permissive
for select
to public
using ((status = 'published'::text));

-- Policy: Authenticated users can read all articles (including drafts)
create policy "Authenticated users can view all articles"
on "public"."articles"
as permissive
for select
to authenticated
using (true);

-- Policy: Only admins can insert articles
create policy "Only admins can create articles"
on "public"."articles"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::user_role)))));

-- Policy: Only admins can update articles
create policy "Only admins can update articles"
on "public"."articles"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::user_role)))))
with check ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::user_role)))));

-- Policy: Only admins can delete articles
create policy "Only admins can delete articles"
on "public"."articles"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::user_role)))));

-- Grant permissions
grant delete on table "public"."articles" to "anon";
grant insert on table "public"."articles" to "anon";
grant references on table "public"."articles" to "anon";
grant select on table "public"."articles" to "anon";
grant trigger on table "public"."articles" to "anon";
grant truncate on table "public"."articles" to "anon";
grant update on table "public"."articles" to "anon";

grant delete on table "public"."articles" to "authenticated";
grant insert on table "public"."articles" to "authenticated";
grant references on table "public"."articles" to "authenticated";
grant select on table "public"."articles" to "authenticated";
grant trigger on table "public"."articles" to "authenticated";
grant truncate on table "public"."articles" to "authenticated";
grant update on table "public"."articles" to "authenticated";

grant delete on table "public"."articles" to "service_role";
grant insert on table "public"."articles" to "service_role";
grant references on table "public"."articles" to "service_role";
grant select on table "public"."articles" to "service_role";
grant trigger on table "public"."articles" to "service_role";
grant truncate on table "public"."articles" to "service_role";
grant update on table "public"."articles" to "service_role";
