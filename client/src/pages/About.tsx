import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import evePhoto from "@assets/Eve_photo_1772268518219.jpeg";

export default function About() {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-semibold tracking-tight mb-4" data-testid="text-about-title">
            About Me
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="relative mb-8">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg blur-xl opacity-50" />
              <img
                src={evePhoto}
                alt="Eve Nyagaya"
                className="relative rounded-lg shadow-lg w-full object-cover aspect-[4/5]"
                data-testid="img-about-page"
              />
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold mb-4 text-primary" data-testid="text-about-greeting">
              Hey there, I'm so glad you're here!
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              My name is Eve, I recently gave my life to Jesus Christ, and accepted Him as my Lord and Saviour. I celebrated my one year anniversary as a new child of God a month ago.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              This is the 3rd time in my adult life that I am actually having a blog! First a solo travel blog in 2016-2019, then a food and women's empowerment blog in 2024-2025. And now 2026! I am back, but this time with Jesus Christ as my Lord and BOSS. I think I express myself better in writing, I am not such a good speaker, with my chest, I have tried and tested this all over social media in my past life.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              I love to encourage and uplift those around me and I especially love to empower women. I am here to share my own personal life experiences, faith journey, the transformation, what God has done and continues to do in my life and what I learn from Him everyday.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Welcome to the blog!
            </p>

            <div className="flex items-center gap-6 text-sm mb-8">
              <div className="flex items-center gap-2 text-accent">
                <Heart className="w-4 h-4" />
                <span>Faith-Centered</span>
              </div>
              <div className="flex items-center gap-2 text-accent">
                <Sparkles className="w-4 h-4" />
                <span>Practical Wisdom</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Link href="/devotionals">
                <Button data-testid="button-about-devotionals">
                  Read Devotionals
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/subscribe">
                <Button variant="outline" data-testid="button-about-subscribe">
                  Subscribe
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
