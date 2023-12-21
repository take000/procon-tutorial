# include <Siv3D.hpp> // Siv3D v0.6.13

void Main()
{
	// 背景色変更
	// Scene::setBackground(ColorF{ 0.6, 0.8, 0.7 });
	Scene::SetBackground(ColorF{ 0.7, 0.8, 0.9 });

	// 画像変更
	// const Texture texture{ U"example/windmill.png" };
	const Texture texture{ U"example/siv3d-kun.png" };


	// 恐竜変更
	// const Texture emoji{ U"🦖"_emoji };
	const Texture emoji{ U"🦕"_emoji };
	const Font font{ FontMethod::MSDF, 48, Typeface::Bold };
	const Font emojiFont{ 48, Typeface::ColorEmoji };
	font.addFallback(emojiFont);

	int32 count = 0;
	bool checked = false;
	double speed = 200.0;
	double playerPosX = 400;
	bool isPlayerFacingRight = true;

	// 恐竜の上下移動用変数
	double playerPosY = 540;

	while (System::Update())
	{
		texture.draw(20, 20);

		// 表示される文字変更
		// font(U"Hello, Siv3D!🎮").draw(64, Vec2{ 20, 340 }, ColorF{ 0.2, 0.4, 0.8 });
		font(U"Hello World!").draw(64, Vec2{ 20, 340 }, ColorF{ 0.2, 0.4, 0.8 });

		font(U"Siv3D (シブスリーディー) は、ゲームやアプリを楽しく簡単な C++ コードで開発できるフレームワークです。")
			.draw(18, Rect{ 20, 430, 480, 200 }, Palette::Black);
		Rect{ 540, 20, 80, 80 }.draw();
		RoundRect{ 680, 20, 80, 200, 20 }.draw(ColorF{ 0.0, 0.4, 0.6 });
		Circle{ 580, 180, 40 }.draw(Palette::Seagreen);
		Line{ 540, 330, 760, 260 }.drawArrow(8, SizeF{ 20, 20 }, ColorF{ 0.4 });
		Circle{ Cursor::Pos(), 40 }.draw(ColorF{ 1.0, 0.0, 0.0, 0.5 });

		if (SimpleGUI::Button(U"count: {}"_fmt(count), Vec2{ 520, 370 }, 120, (checked == false)))
		{
			++count;
		}

		SimpleGUI::CheckBox(checked, U"Lock \U000F033E", Vec2{ 660, 370 }, 120);
		SimpleGUI::Slider(U"speed: {:.1f}"_fmt(speed), speed, 100, 400, Vec2{ 520, 420 }, 140, 120);

		if (KeyLeft.pressed())
		{
			playerPosX = Max((playerPosX - speed * Scene::DeltaTime()), 60.0);
			isPlayerFacingRight = false;
		}

		if (KeyRight.pressed())
		{
			playerPosX = Min((playerPosX + speed * Scene::DeltaTime()), 740.0);
			isPlayerFacingRight = true;
		}

		// 恐竜の上下移動
		if (KeyDown.pressed())
		{
			playerPosY = Min((playerPosY + speed * Scene::DeltaTime()), 540.0);
		}
		if (KeyUp.pressed())
		{
			playerPosY = Max((playerPosY - speed * Scene::DeltaTime()), 60.0);
		}
		emoji.scaled(0.75).mirrored(isPlayerFacingRight).drawAt(playerPosX, playerPosY);
	}
}
