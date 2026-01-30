--
-- PostgreSQL database dump
--

\restrict Ru41kKKE5uwqFvz7PAg2hhkOtBEWWavbSKepynSELpsv3bZyBt6XohCEJFfcATO

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: photos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.photos (
    id integer NOT NULL,
    url text NOT NULL,
    caption text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.photos OWNER TO postgres;

--
-- Name: photos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.photos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.photos_id_seq OWNER TO postgres;

--
-- Name: photos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.photos_id_seq OWNED BY public.photos.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    content text NOT NULL,
    summary text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    image_url text,
    category text DEFAULT 'Podcast'::text
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.posts_id_seq OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: photos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos ALTER COLUMN id SET DEFAULT nextval('public.photos_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Data for Name: photos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.photos (id, url, caption, created_at) FROM stdin;
1	https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600	Behind the scenes at the studio	2026-01-24 14:30:52.829397
2	https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600	Podcast recording session	2026-01-24 14:30:52.866476
3	https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600	Speaking at the conference	2026-01-24 14:30:52.870803
4	https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600	Team planning meeting	2026-01-24 14:30:52.874471
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, title, slug, content, summary, created_at, image_url, category) FROM stdin;
4	Taking Control of Your Personal Finances	personal-finance-basics	Financial freedom starts with understanding where your money goes and making intentional choices about how you spend, save, and invest. Whether you're just starting out or looking to level up your money game, these principles will serve you well.\n\nFirst, track everything. For one month, write down every single purchase. This awareness alone can be transformative. You'll quickly see patterns—maybe that daily coffee run or subscription you forgot about.\n\nNext, build your emergency fund. Aim for three to six months of expenses in a high-yield savings account. This cushion gives you peace of mind and prevents you from going into debt when life happens.\n\nThen, tackle any high-interest debt aggressively. Credit card balances are wealth killers. Pay more than the minimum and consider the avalanche method—targeting your highest interest rate first.\n\nFinally, start investing early. Even small amounts compound over time. Take advantage of employer 401(k) matches and consider index funds for a simple, diversified approach. Your future self will thank you.	Practical steps to take control of your money and build lasting financial freedom.	2026-01-24 14:55:41.392919	https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800	Finance
5	Deepening Your Relationship with God	relationship-with-god	In the busyness of life, it's easy to let our spiritual lives take a backseat. But nurturing your relationship with God is the foundation for everything else—your peace, your purpose, and your ability to pour into others.\n\nStart with showing up. Consistency matters more than perfection. Whether it's five minutes or an hour, carve out daily time to be still with God. Morning works best for many, before the demands of the day crowd in.\n\nRead Scripture with intention. Don't just check a box—ask God to speak to you through His Word. Journal what stands out and how it applies to your life right now.\n\nPrayer is a conversation, not a performance. Talk to God like you would a trusted friend. Share your worries, your gratitude, your questions. Then pause and listen. He speaks through stillness, through others, through circumstances.\n\nFind community. We weren't meant to walk this journey alone. A small group, a church family, or even one trusted friend who shares your faith can provide encouragement and accountability.\n\nRemember, God isn't looking for perfect—He's looking for present. Show up as you are, and watch how He transforms your heart.	Practical ways to grow closer to God and strengthen your faith journey.	2026-01-24 14:55:41.392919	https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800	Faith
6	Making New Year Resolutions That Actually Stick	new-year-resolutions	Every January, we're filled with hope and ambition. By February, most resolutions are forgotten. But it doesn't have to be that way. The secret isn't more willpower—it's a smarter approach.\n\nStart with your why. Don't just say "I want to lose weight." Ask yourself why. Maybe it's to have energy to play with your kids, or to feel confident in your own skin. That deeper motivation will carry you through the hard days.\n\nMake it specific and measurable. "Get healthier" is vague. "Walk 30 minutes every weekday" is clear. You know exactly what success looks like.\n\nStart ridiculously small. Want to read more? Commit to one page a day. Want to exercise? Start with five minutes. Small wins build momentum and prove to yourself that you can do this.\n\nBuild systems, not just goals. Instead of focusing only on the outcome, design your environment for success. Put your running shoes by the bed. Keep healthy snacks visible. Remove friction from the behaviors you want.\n\nTrack your progress and celebrate wins. A simple habit tracker can be incredibly motivating. And don't forget to acknowledge how far you've come—progress, not perfection, is the goal.\n\nFinally, plan for setbacks. You will have off days. That's human. The difference between those who succeed and those who don't is getting back up. One bad day doesn't erase your progress.	A fresh approach to setting goals that actually lead to lasting change.	2026-01-24 14:55:41.392919	https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800	Personal Growth
7	Finding Your Fitness Rhythm	fitness-journey	Fitness isn't about punishment or perfection—it's about honoring your body and building strength for the life you want to live. Whether you're starting from zero or getting back on track, here's how to make movement a sustainable part of your life.\n\nFind what you actually enjoy. If you hate running, don't run. Try dance, hiking, swimming, yoga, strength training, or group fitness classes. When exercise feels like play, you'll stick with it.\n\nSchedule it like an appointment. Look at your calendar and block time for movement. Treat it as non-negotiable as a doctor's appointment. Morning workouts work well for many because they're done before life gets in the way.\n\nStart where you are. You don't need to go from couch to marathon. Begin with what feels manageable—even 10 minutes counts. Gradually increase duration and intensity as you build the habit.\n\nMix it up. Your body adapts, and variety keeps things interesting. Alternate between cardio, strength, and flexibility work. This also prevents overuse injuries and keeps you engaged.\n\nFuel your body well. Exercise and nutrition go hand in hand. Focus on whole foods, adequate protein, and staying hydrated. Notice how what you eat affects how you feel and perform.\n\nRest is part of the plan. Your body gets stronger during recovery, not during the workout itself. Build in rest days and prioritize sleep. Pushing too hard leads to burnout and injury.	How to build a sustainable exercise routine that fits your life and brings you joy.	2026-01-24 14:55:41.392919	https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800	Health
8	The Beautiful Chaos of Raising a Young Family	raising-young-family	The days are long but the years are short—and when you're in the thick of raising little ones, both truths feel very real. Here's what I've learned about surviving and thriving during this demanding, beautiful season.\n\nLower your expectations, raise your grace. Your house will be messy. You will lose your patience. Some days, survival mode is the only mode. That's okay. You're doing harder work than you realize.\n\nPrioritize connection over perfection. Your kids don't need Pinterest-perfect birthday parties or organic everything. They need you—present, attentive, and engaged. Put down the phone and get on the floor.\n\nProtect your marriage. It's easy to become roommates who co-manage children. But your relationship is the foundation of your family. Regular date nights—even at-home ones—keep that connection strong.\n\nBuild a village. Parenting wasn't meant to be done in isolation. Lean on family, friends, neighbors, and community. Accept help when it's offered. Offer help when you can.\n\nEstablish rhythms, not rigid routines. Predictable patterns—meal times, bedtimes, weekly traditions—create security for kids. But hold them loosely. Flexibility is essential when life with little ones is inherently unpredictable.\n\nTake care of yourself. You can't pour from an empty cup. Guard small pockets of time for things that replenish you—a morning coffee in silence, exercise, time with friends.\n\nDocument the moments. Take photos, write notes, capture the little things. You think you'll remember, but the details fade. These recordings become treasures.\n\nThis season is temporary. When you're exhausted and touched out and wondering if you're doing enough, remember: these years will pass faster than you think. You're building something beautiful, one ordinary day at a time.	Encouragement and wisdom for parents navigating the rewarding challenges of young children.	2026-01-24 14:55:41.392919	https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800	Family
\.


--
-- Name: photos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.photos_id_seq', 4, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_id_seq', 8, true);


--
-- Name: photos photos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: posts posts_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_slug_unique UNIQUE (slug);


--
-- PostgreSQL database dump complete
--

\unrestrict Ru41kKKE5uwqFvz7PAg2hhkOtBEWWavbSKepynSELpsv3bZyBt6XohCEJFfcATO

