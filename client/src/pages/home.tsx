import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Link } from "react-router-dom";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import  Coin3D  from "@/components/Coin3D";
import {
  Zap,
  Shield,
  Headphones,
  Tags,
  Smartphone,
  History,
} from "lucide-react";

export default function Home() {
  const { user } = useAuth();
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    // ✅ Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      canvasContainerRef.current.clientWidth /
        canvasContainerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      canvasContainerRef.current.clientWidth,
      canvasContainerRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // 🔹 Biar ringan
    canvasContainerRef.current.appendChild(renderer.domElement);

    // ✅ Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(3, 10, 10);
    scene.add(dirLight);

    let model: THREE.Object3D | null = null;

    // ✅ Load GLTF model (harus di public/3d-model/)
    const loader = new GLTFLoader();
    loader.load(
      "/3d-model/Robux1.glb",
      (gltf) => {
        model = gltf.scene;
        model.scale.set(1.2, 1.2, 1.2);
        model.position.set(0, -0.5, 0);
        scene.add(model);

        // ✅ Animation loop lebih ringan
        renderer.setAnimationLoop(() => {
          if (model) model.rotation.y += 0.01;
          renderer.render(scene, camera);
        });
      },
      undefined,
      (error) => {
        console.error("Error loading 3D model:", error);
      }
    );

    // ✅ Handle resize
    const handleResize = () => {
      if (!canvasContainerRef.current) return;
      camera.aspect =
        canvasContainerRef.current.clientWidth /
        canvasContainerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        canvasContainerRef.current.clientWidth,
        canvasContainerRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.setAnimationLoop(null); // stop render loop
      renderer.dispose();
      if (canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      model = null;
    };
  }, []);

  // ✅ Feature list tetap sama
  const features = [
    {
      icon: Zap,
      title: "Instant Delivery",
      description: "Get your Robux delivered instantly after payment.",
      gradient: "from-blue-500 to-blue-700",
    },
    {
      icon: Shield,
      title: "100% Secure",
      description: "Secure payment gateways with advanced encryption.",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our support team is ready anytime.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Tags,
      title: "Best Prices",
      description: "We offer competitive and fair pricing.",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Easily access from any device.",
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: History,
      title: "Transaction History",
      description: "Track all your top-ups and purchases.",
      gradient: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="pt-16">
        <div className="bg-gradient-to-br from-blue-500 via-blue-700 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Ready to top up your Robux? Fast and secure service awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/topup">
                <Button className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-4 shadow-lg">
                  <Zap className="mr-2" size={20} />
                  Start Top-Up
                </Button>
              </Link>
              <Link to="/history">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-700 text-lg px-8 py-4"
                >
                  <History className="mr-2" size={20} />
                  View History
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 3D Preview Section */}
        <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-[400px] flex items-center justify-center relative overflow-hidden">
          <div
            ref={canvasContainerRef}
            className="absolute inset-0 w-full h-full"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-green-500/10 animate-pulse"></div>
          <div className="w-full h-[400px] z-10">
            <Coin3D />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg">
                <CardContent className="p-6">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}
                  >
                    <feature.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
