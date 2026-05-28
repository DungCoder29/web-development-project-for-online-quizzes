<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // ── SEED USERS ──────────────────────────────────────────────────────
        $users = [
            ['name' => 'Nguyễn Văn An',   'email' => 'an.nguyen@example.com',   'phone' => '0901234561', 'password' => bcrypt('password')],
            ['name' => 'Trần Thị Bình',   'email' => 'binh.tran@example.com',   'phone' => '0901234562', 'password' => bcrypt('password')],
            ['name' => 'Lê Hoàng Cường',  'email' => 'cuong.le@example.com',    'phone' => '0901234563', 'password' => bcrypt('password')],
            ['name' => 'Phạm Thị Dung',   'email' => 'dung.pham@example.com',   'phone' => '0901234564', 'password' => bcrypt('password')],
            ['name' => 'Võ Minh Đức',     'email' => 'duc.vo@example.com',      'phone' => '0901234565', 'password' => bcrypt('password')],
            ['name' => 'Ngô Thị Hoa',     'email' => 'hoa.ngo@example.com',     'phone' => '0901234566', 'password' => bcrypt('password')],
            ['name' => 'Đinh Văn Khoa',   'email' => 'khoa.dinh@example.com',   'phone' => '0901234567', 'password' => bcrypt('password')],
            ['name' => 'Bùi Thị Lan',     'email' => 'lan.bui@example.com',     'phone' => '0901234568', 'password' => bcrypt('password')],
            ['name' => 'Đặng Văn Minh',   'email' => 'minh.dang@example.com',   'phone' => '0901234569', 'password' => bcrypt('password')],
            ['name' => 'Hoàng Thị Nga',   'email' => 'nga.hoang@example.com',   'phone' => '0901234570', 'password' => bcrypt('password')],
        ];

        foreach ($users as $user) {
            User::firstOrCreate(['email' => $user['email']], $user);
        }

        // ── SEED SUBJECTS ───────────────────────────────────────────────────
        $subjects = [
            ['id' => 1, 'name' => 'Toán học',   'desc' => 'Đề kiểm tra chương 1-3', 'duration' => 45, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'name' => 'Vật lý',     'desc' => 'Đề giữa kỳ', 'duration' => 45, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'name' => 'Hóa học',    'desc' => 'Ngân hàng câu hỏi cơ bản', 'duration' => 45, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 4, 'name' => 'Tiếng Anh',  'desc' => 'Đề thi học kỳ', 'duration' => 60, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 5, 'name' => 'Lịch sử',    'desc' => 'Đề ôn tập tổng hợp', 'duration' => 45, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 6, 'name' => 'Sinh học',   'desc' => 'Câu hỏi bài tập lớn', 'duration' => 45, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 7, 'name' => 'Tin học',    'desc' => 'Kiểm tra kiến thức lập trình', 'duration' => 45, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
        ];

        foreach ($subjects as $subject) {
            DB::table('subjects')->updateOrInsert(['id' => $subject['id']], $subject);
        }

        // ── SEED QUESTIONS (15 câu hỏi cho mỗi môn học = 105 câu) ───────────
        DB::table('questions')->truncate(); // Làm sạch bảng câu hỏi để chèn danh sách mới

        DB::table('questions')->insert([
            // ── TOÁN HỌC (subject_id = 1) ───────────────────────────────────
            [
                'subject_id' => 1, 'question' => 'Một cộng một bằng mấy?',
                'option_a' => '1', 'option_b' => '2', 'option_c' => '3', 'option_d' => '4',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 1, 'question' => 'Phép tính 5 + 3 * 2 bằng mấy?',
                'option_a' => '16', 'option_b' => '13', 'option_c' => '11', 'option_d' => '10',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 1, 'question' => 'Căn bậc hai của 64 là mấy?',
                'option_a' => '6', 'option_b' => '7', 'option_c' => '9', 'option_d' => '8',
                'correct_answer' => 'D', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 1, 'question' => 'Đạo hàm của x^2 là gì?',
                'option_a' => '2x', 'option_b' => 'x', 'option_c' => '2', 'option_d' => 'x^2',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 1, 'question' => 'Giá trị của cos(0) là bao nhiêu?',
                'option_a' => '0', 'option_b' => '1', 'option_c' => '-1', 'option_d' => '0.5',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 1, 'question' => 'Số nguyên tố nhỏ nhất là số nào?',
                'option_a' => '0', 'option_b' => '2', 'option_c' => '1', 'option_d' => '3',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 1, 'question' => 'Phương trình x^2 - 4 = 0 có nghiệm là gì?',
                'option_a' => 'x = 4', 'option_b' => 'x = 2', 'option_c' => 'x = 2 hoặc x = -2', 'option_d' => 'vô nghiệm',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 1, 'question' => 'Tổng các góc trong một tam giác bằng bao nhiêu độ?',
                'option_a' => '90 độ', 'option_b' => '360 độ', 'option_c' => '180 độ', 'option_d' => '270 độ',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 1, 'question' => 'Công thức tính diện tích hình tròn có bán kính r là gì?',
                'option_a' => 'Pi * r^2', 'option_b' => '2 * Pi * r', 'option_c' => 'Pi * d', 'option_d' => 'Pi^2 * r',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 1, 'question' => 'Logarit cơ số 10 của 100 bằng bao nhiêu?',
                'option_a' => '1', 'option_b' => '2', 'option_c' => '10', 'option_d' => '100',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 1, 'question' => 'Hệ số góc của đường thẳng y = 3x + 1 là gì?',
                'option_a' => '3', 'option_b' => '1', 'option_c' => '-3', 'option_d' => '1/3',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 1, 'question' => 'Số Pi xấp xỉ bằng bao nhiêu?',
                'option_a' => '3.14', 'option_b' => '3.12', 'option_c' => '3.16', 'option_d' => '3.18',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 1, 'question' => 'Tập nghiệm của bất phương trình x - 2 > 0 là?',
                'option_a' => 'x < 2', 'option_b' => 'x > 2', 'option_c' => 'x >= 2', 'option_d' => 'x <= 2',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 1, 'question' => 'Trong các số sau, số nào chia hết cho 3?',
                'option_a' => '10', 'option_b' => '14', 'option_c' => '15', 'option_d' => '22',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 1, 'question' => 'Công thức tính diện tích tam giác là gì?',
                'option_a' => '1/2 * đáy * chiều cao', 'option_b' => 'đáy * chiều cao', 'option_c' => '1/2 * (đáy + chiều cao)', 'option_d' => 'đáy * chiều cao / 4',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],

            // ── VẬT LÝ (subject_id = 2) ───────────────────────────────────────
            [
                'subject_id' => 2, 'question' => 'Đơn vị đo cường độ dòng điện là gì?',
                'option_a' => 'Ampe (A)', 'option_b' => 'Vôn (V)', 'option_c' => 'Oát (W)', 'option_d' => 'Ôm (Ω)',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 2, 'question' => 'Vận tốc ánh sáng trong chân không là bao nhiêu?',
                'option_a' => '300 km/s', 'option_b' => '3,000 km/s', 'option_c' => '300,000 km/s', 'option_d' => '30,000 km/s',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 2, 'question' => 'Trọng lực của một vật được tính bằng công thức nào?',
                'option_a' => 'P = m * g', 'option_b' => 'P = m / g', 'option_c' => 'P = F * s', 'option_d' => 'P = m * v',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 2, 'question' => 'Hiện tượng cầu vồng xảy ra do hiện tượng gì của ánh sáng?',
                'option_a' => 'Phản xạ ánh sáng', 'option_b' => 'Tán sắc ánh sáng', 'option_c' => 'Khúc xạ ánh sáng', 'option_d' => 'Giao thoa ánh sáng',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 2, 'question' => 'Nhiệt độ sôi của nước ở áp suất tiêu chuẩn là bao nhiêu?',
                'option_a' => '0 độ C', 'option_b' => '50 độ C', 'option_c' => '80 độ C', 'option_d' => '100 độ C',
                'correct_answer' => 'D', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 2, 'question' => 'Đơn vị đo điện trở là gì?',
                'option_a' => 'Ampe (A)', 'option_b' => 'Vôn (V)', 'option_c' => 'Ôm (Ω)', 'option_d' => 'Henri (H)',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 2, 'question' => 'Công thức tính vận tốc trong chuyển động thẳng đều là?',
                'option_a' => 'v = s / t', 'option_b' => 'v = s * t', 'option_c' => 'v = 1/2 * a * t^2', 'option_d' => 'v = s / t^2',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 2, 'question' => 'Lực đẩy Archimedes phụ thuộc vào các yếu tố nào?',
                'option_a' => 'Khối lượng của vật', 'option_b' => 'Trọng lượng riêng của chất lỏng và thể tích phần chất lỏng bị vật chiếm chỗ', 'option_c' => 'Hình dạng của vật', 'option_d' => 'Nhiệt độ của chất lỏng',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 2, 'question' => 'Thiết bị nào dùng để đo hiệu điện thế?',
                'option_a' => 'Vôn kế', 'option_b' => 'Ampe kế', 'option_c' => 'Nhiệt kế', 'option_d' => 'Áp kế',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 2, 'question' => 'Trái đất tự quay quanh trục của nó theo hướng nào?',
                'option_a' => 'Từ đông sang tây', 'option_b' => 'Từ tây sang đông', 'option_c' => 'Từ bắc sang nam', 'option_d' => 'Ngẫu nhiên',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 2, 'question' => 'Đơn vị đo công suất là gì?',
                'option_a' => 'Jun (J)', 'option_b' => 'Oát (W)', 'option_c' => 'Niuton (N)', 'option_d' => 'Mã lực (HP)',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 2, 'question' => 'Kính lúp là loại thấu kính nào?',
                'option_a' => 'Thấu kính hội tụ', 'option_b' => 'Thấu kính phân kì', 'option_c' => 'Kính phẳng', 'option_d' => 'Kính hai tròng',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 2, 'question' => 'Tần số của dòng điện xoay chiều ở Việt Nam là bao nhiêu?',
                'option_a' => '60 Hz', 'option_b' => '110 Hz', 'option_c' => '50 Hz', 'option_d' => '220 Hz',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 2, 'question' => 'Sóng âm không truyền được trong môi trường nào?',
                'option_a' => 'Chất rắn', 'option_b' => 'Chất lỏng', 'option_c' => 'Chất khí', 'option_d' => 'Chân không',
                'correct_answer' => 'D', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 2, 'question' => 'Lực đàn hồi của lò xo tỉ lệ thuận với độ biến dạng là nội dung định luật nào?',
                'option_a' => 'Định luật Hooke', 'option_b' => 'Định luật Newton', 'option_c' => 'Định luật Ohm', 'option_d' => 'Định luật Pascal',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],

            // ── HÓA HỌC (subject_id = 3) ──────────────────────────────────────
            [
                'subject_id' => 3, 'question' => 'Ký hiệu hóa học của vàng là gì?',
                'option_a' => 'Ag', 'option_b' => 'Au', 'option_c' => 'Fe', 'option_d' => 'Cu',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 3, 'question' => 'Nước được cấu tạo từ các nguyên tố nào?',
                'option_a' => 'Hydro và Oxy', 'option_b' => 'Nitơ và Oxy', 'option_c' => 'Cacbon và Oxy', 'option_d' => 'Hydro và Nitơ',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 3, 'question' => 'Axit sunfuric có công thức hóa học là gì?',
                'option_a' => 'HCl', 'option_b' => 'HNO3', 'option_c' => 'H2SO4', 'option_d' => 'H2CO3',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 3, 'question' => 'Chất nào sau đây được gọi là khí gas cười?',
                'option_a' => 'N2O', 'option_b' => 'CO2', 'option_c' => 'CO', 'option_d' => 'NO2',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 3, 'question' => 'Kim loại nào nhẹ nhất trong các kim loại sau?',
                'option_a' => 'Nhôm', 'option_b' => 'Lithi', 'option_c' => 'Sắt', 'option_d' => 'Đồng',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 3, 'question' => 'Kim loại nào ở trạng thái lỏng ở nhiệt độ thường?',
                'option_a' => 'Chì', 'option_b' => 'Kẽm', 'option_c' => 'Thủy ngân', 'option_d' => 'Đồng',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 3, 'question' => 'Khí nào chiếm phần lớn thể tích trong không khí?',
                'option_a' => 'Oxy', 'option_b' => 'Nitơ', 'option_c' => 'Cacbonic', 'option_d' => 'Argon',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 3, 'question' => 'Độ pH của nước tinh khiết ở nhiệt độ thường là bao nhiêu?',
                'option_a' => '5', 'option_b' => '7', 'option_c' => '9', 'option_d' => '14',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 3, 'question' => 'Công thức hóa học của muối ăn là gì?',
                'option_a' => 'NaCl', 'option_b' => 'KCl', 'option_c' => 'CaCl2', 'option_d' => 'NaHCO3',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 3, 'question' => 'Nguyên tố nào phổ biến nhất trong vỏ Trái Đất?',
                'option_a' => 'Sắt', 'option_b' => 'Nhôm', 'option_c' => 'Oxy', 'option_d' => 'Cacbon',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 3, 'question' => 'Axit axetic có trong chất nào quen thuộc hàng ngày?',
                'option_a' => 'Giấm ăn', 'option_b' => 'Nước chanh', 'option_c' => 'Nước vôi trong', 'option_d' => 'Xà phòng',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 3, 'question' => 'Khí nào được cây xanh hấp thụ trong quá trình quang hợp?',
                'option_a' => 'Oxy', 'option_b' => 'Cacbonic (CO2)', 'option_c' => 'Nitơ', 'option_d' => 'Metan',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 3, 'question' => 'Chất nào là nguyên nhân chính gây ra hiệu ứng nhà kính?',
                'option_a' => 'O2', 'option_b' => 'N2', 'option_c' => 'CO2', 'option_d' => 'Ar',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 3, 'question' => 'Kim loại nào dẫn điện tốt nhất?',
                'option_a' => 'Bạc', 'option_b' => 'Đồng', 'option_c' => 'Vàng', 'option_d' => 'Sắt',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 3, 'question' => 'Hợp chất hữu cơ đơn giản nhất là chất nào?',
                'option_a' => 'Metan (CH4)', 'option_b' => 'Etilen (C2H4)', 'option_c' => 'Axetilen (C2H2)', 'option_d' => 'Benzen (C6H6)',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],

            // ── TIẾNG ANH (subject_id = 4) ────────────────────────────────────
            [
                'subject_id' => 4, 'question' => 'What is the past tense of "go"?',
                'option_a' => 'goes', 'option_b' => 'goed', 'option_c' => 'went', 'option_d' => 'gone',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 4, 'question' => 'Choose the correct spelling:',
                'option_a' => 'Beautifull', 'option_b' => 'Beautiful', 'option_c' => 'Beatiful', 'option_d' => 'Bautifull',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 4, 'question' => 'Complete the sentence: She ___ English very well.',
                'option_a' => 'speaks', 'option_b' => 'speak', 'option_c' => 'speaking', 'option_d' => 'spoke',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 4, 'question' => 'What is the antonym of "hot"?',
                'option_a' => 'warm', 'option_b' => 'spicy', 'option_c' => 'fire', 'option_d' => 'cold',
                'correct_answer' => 'D', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 4, 'question' => 'Complete: If it rains, we ___ at home.',
                'option_a' => 'stayed', 'option_b' => 'stay', 'option_c' => 'will stay', 'option_d' => 'would stay',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 4, 'question' => 'What is the synonym of "large"?',
                'option_a' => 'big', 'option_b' => 'small', 'option_c' => 'tiny', 'option_d' => 'thin',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 4, 'question' => 'Complete: They ___ playing football now.',
                'option_a' => 'is', 'option_b' => 'are', 'option_c' => 'was', 'option_d' => 'were',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 4, 'question' => 'Choose the correct word: He is interested ___ reading books.',
                'option_a' => 'in', 'option_b' => 'on', 'option_c' => 'at', 'option_d' => 'about',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 4, 'question' => 'What is the comparative form of "good"?',
                'option_a' => 'gooder', 'option_b' => 'better', 'option_c' => 'best', 'option_d' => 'well',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 4, 'question' => 'Complete: I have been learning English ___ 3 years.',
                'option_a' => 'since', 'option_b' => 'ago', 'option_c' => 'for', 'option_d' => 'in',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 4, 'question' => 'Choose the noun in the sentence: "The cat runs fast."',
                'option_a' => 'runs', 'option_b' => 'cat', 'option_c' => 'fast', 'option_d' => 'the',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 4, 'question' => 'What is the plural form of "child"?',
                'option_a' => 'childs', 'option_b' => 'childes', 'option_c' => 'children', 'option_d' => 'childrens',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 4, 'question' => 'Complete: She has ___ book.',
                'option_a' => 'a', 'option_b' => 'an', 'option_c' => 'some', 'option_d' => 'any',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 4, 'question' => 'What time is it when the clock shows 12:00 at night?',
                'option_a' => 'Noon', 'option_b' => 'Afternoon', 'option_c' => 'Midnight', 'option_d' => 'Morning',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 4, 'question' => 'Complete: ___ is your teacher? - Miss Hoa.',
                'option_a' => 'Who', 'option_b' => 'What', 'option_c' => 'Where', 'option_d' => 'When',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],

            // ── LỊCH SỬ (subject_id = 5) ──────────────────────────────────────
            [
                'subject_id' => 5, 'question' => 'Chiến dịch Điện Biên Phủ kết thúc vào năm nào?',
                'option_a' => '1945', 'option_b' => '1975', 'option_c' => '1954', 'option_d' => '1930',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 5, 'question' => 'Ai là người đọc Tuyên ngôn Độc lập khai sinh nước VNDCCH?',
                'option_a' => 'Hồ Chí Minh', 'option_b' => 'Võ Nguyên Giáp', 'option_c' => 'Phan Bội Châu', 'option_d' => 'Trần Phú',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 5, 'question' => 'Ai là vị vua cuối cùng của triều đại phong kiến Việt Nam?',
                'option_a' => 'Gia Long', 'option_b' => 'Bảo Đại', 'option_c' => 'Tự Đức', 'option_d' => 'Khải Định',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 5, 'question' => 'Cách mạng Tháng Tám diễn ra vào năm nào?',
                'option_a' => '1930', 'option_b' => '1940', 'option_c' => '1950', 'option_d' => '1945',
                'correct_answer' => 'D', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 5, 'question' => 'Trận Bạch Đằng Ngô Quyền đánh bại quân Nam Hán vào năm nào?',
                'option_a' => '938', 'option_b' => '981', 'option_c' => '1288', 'option_d' => '1010',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 5, 'question' => 'Quốc gia cổ đại nào được coi là quê hương của Thế vận hội Olympic?',
                'option_a' => 'Ai Cập', 'option_b' => 'La Mã', 'option_c' => 'Hy Lạp', 'option_d' => 'Ba Tư',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 5, 'question' => 'Hiệp định Giơ-ne-vơ về Việt Nam được ký kết vào năm nào?',
                'option_a' => '1946', 'option_b' => '1950', 'option_c' => '1954', 'option_d' => '1973',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 5, 'question' => 'Nước Việt Nam Dân chủ Cộng hòa đổi tên thành Cộng hòa Xã hội Chủ nghĩa Việt Nam vào năm nào?',
                'option_a' => '1975', 'option_b' => '1986', 'option_c' => '1976', 'option_d' => '1980',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 5, 'question' => 'Sự kiện lịch sử nào đánh dấu sự kết thúc hoàn toàn của chiến tranh Việt Nam?',
                'option_a' => 'Giải phóng miền Nam 30/4/1975', 'option_b' => 'Ký Hiệp định Paris 1973', 'option_c' => 'Chiến thắng Điện Biên Phủ trên không 1972', 'option_d' => 'Trận Điện Biên Phủ 1954',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 5, 'question' => 'Vạn Lý Trường Thành là công trình kiến trúc nổi tiếng của quốc gia nào?',
                'option_a' => 'Trung Quốc', 'option_b' => 'Nhật Bản', 'option_c' => 'Hàn Quốc', 'option_d' => 'Ấn Độ',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 5, 'question' => 'Nhà nước đầu tiên của nước ta có tên là gì?',
                'option_a' => 'Văn Lang', 'option_b' => 'Âu Lạc', 'option_c' => 'Vạn Xuân', 'option_d' => 'Đại Cồ Việt',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 5, 'question' => 'Ai là người khởi xướng cuộc khởi nghĩa Lam Sơn?',
                'option_a' => 'Lê Lợi', 'option_b' => 'Trần Hưng Đạo', 'option_c' => 'Nguyễn Trãi', 'option_d' => 'Lê Thánh Tông',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 5, 'question' => 'Ai được mệnh danh là Người anh hùng áo vải Tây Sơn?',
                'option_a' => 'Nguyễn Nhạc', 'option_b' => 'Quang Trung - Nguyễn Huệ', 'option_c' => 'Nguyễn Lữ', 'option_d' => 'Nguyễn Ánh',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 5, 'question' => 'Cách mạng Pháp bùng nổ vào năm nào?',
                'option_a' => '1776', 'option_b' => '1783', 'option_c' => '1789', 'option_d' => '1812',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 5, 'question' => 'Sự kiện nào mở đầu cho Chiến tranh thế giới thứ hai?',
                'option_a' => 'Đức tấn công Ba Lan năm 1939', 'option_b' => 'Đức tấn công Liên Xô năm 1941', 'option_c' => 'Nhật Bản tấn công Trân Châu Cảng năm 1941', 'option_d' => 'Đức chiếm đóng Tiệp Khắc năm 1938',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],

            // ── SINH HỌC (subject_id = 6) ─────────────────────────────────────
            [
                'subject_id' => 6, 'question' => 'Cơ quan nào trong cơ thể người lọc máu?',
                'option_a' => 'Tim', 'option_b' => 'Thận', 'option_c' => 'Phổi', 'option_d' => 'Dạ dày',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 6, 'question' => 'Nhóm máu nào được gọi là nhóm máu chuyên cho?',
                'option_a' => 'Nhóm máu O', 'option_b' => 'Nhóm máu A', 'option_c' => 'Nhóm máu B', 'option_d' => 'Nhóm máu AB',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 6, 'question' => 'Chất diệp lục trong cây có màu gì?',
                'option_a' => 'Màu đỏ', 'option_b' => 'Màu vàng', 'option_c' => 'Màu xanh lá cây', 'option_d' => 'Không màu',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 6, 'question' => 'Xương dài nhất trong cơ thể người là xương nào?',
                'option_a' => 'Xương sườn', 'option_b' => 'Xương cánh tay', 'option_c' => 'Xương cột sống', 'option_d' => 'Xương đùi',
                'correct_answer' => 'D', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 6, 'question' => 'Thuyết tiến hóa được đề xuất bởi nhà khoa học nào?',
                'option_a' => 'Newton', 'option_b' => 'Charles Darwin', 'option_c' => 'Einstein', 'option_d' => 'Mendeleev',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 6, 'question' => 'Đơn vị cấu tạo nên cơ thể sinh vật là gì?',
                'option_a' => 'Tế bào', 'option_b' => 'Mô', 'option_c' => 'Cơ quan', 'option_d' => 'Nguyên tử',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 6, 'question' => 'Chất nào vận chuyển oxy đi khắp cơ thể người?',
                'option_a' => 'Bạch cầu', 'option_b' => 'Huyết sắc tố (Hemoglobin)', 'option_c' => 'Huyết tương', 'option_d' => 'Tiểu cầu',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 6, 'question' => 'Hệ sinh thái lớn nhất trên Trái đất là gì?',
                'option_a' => 'Rừng nhiệt đới', 'option_b' => 'Đại dương', 'option_c' => 'Sinh quyển', 'option_d' => 'Sa mạc',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 6, 'question' => 'Loài chim nào có kích thước lớn nhất thế giới?',
                'option_a' => 'Đại bàng', 'option_b' => 'Đà điểu', 'option_c' => 'Kền kền', 'option_d' => 'Thiên nga',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 6, 'question' => 'Động vật nào lớn nhất còn sống trên Trái đất?',
                'option_a' => 'Voi châu Phi', 'option_b' => 'Cá voi xanh', 'option_c' => 'Khủng long', 'option_d' => 'Cá mập trắng lớn',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 6, 'question' => 'Nước chiếm khoảng bao nhiêu phần trăm trọng lượng cơ thể người trưởng thành?',
                'option_a' => '50%', 'option_b' => '70%', 'option_c' => '90%', 'option_d' => '30%',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 6, 'question' => 'Loại vitamin nào được tổng hợp khi da tiếp xúc với ánh nắng mặt trời?',
                'option_a' => 'Vitamin A', 'option_b' => 'Vitamin C', 'option_c' => 'Vitamin D', 'option_d' => 'Vitamin E',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 6, 'question' => 'Quá trình cây xanh tổng hợp chất hữu cơ từ CO2 và nước nhờ ánh sáng mặt trời gọi là?',
                'option_a' => 'Quang hợp', 'option_b' => 'Hô hấp', 'option_c' => 'Thoát hơi nước', 'option_d' => 'Hấp thụ',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 6, 'question' => 'Nhóm động vật nào đẻ con và nuôi con bằng sữa mẹ?',
                'option_a' => 'Thú', 'option_b' => 'Chim', 'option_c' => 'Bò sát', 'option_d' => 'Lưỡng cư',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 6, 'question' => 'Tim người có mấy ngăn?',
                'option_a' => '2 ngăn', 'option_b' => '3 ngăn', 'option_c' => '4 ngăn', 'option_d' => '5 ngăn',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],

            // ── TIN HỌC (subject_id = 7) ──────────────────────────────────────
            [
                'subject_id' => 7, 'question' => 'Định dạng file nào sau đây là file ảnh?',
                'option_a' => '.png', 'option_b' => '.mp3', 'option_c' => '.exe', 'option_d' => '.txt',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 7, 'question' => 'RAM là viết tắt của từ gì?',
                'option_a' => 'Read Access Memory', 'option_b' => 'Rapid Access Memory', 'option_c' => 'Random Access Memory', 'option_d' => 'Real Active Memory',
                'correct_answer' => 'C', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 7, 'question' => 'Trong lập trình, vòng lặp nào lặp với số lần biết trước?',
                'option_a' => 'while', 'option_b' => 'for', 'option_c' => 'do-while', 'option_d' => 'foreach',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 7, 'question' => 'Giao thức HTTP chạy mặc định trên cổng nào?',
                'option_a' => '443', 'option_b' => '21', 'option_c' => '22', 'option_d' => '80',
                'correct_answer' => 'D', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 7, 'question' => 'Đâu là một ngôn ngữ lập trình phổ biến?',
                'option_a' => 'Python', 'option_b' => 'HTML', 'option_c' => 'CSS', 'option_d' => 'JSON',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 7, 'question' => 'Hệ điều hành Windows là của công ty nào?',
                'option_a' => 'Microsoft', 'option_b' => 'Apple', 'option_c' => 'Google', 'option_d' => 'Intel',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 7, 'question' => 'Thiết bị nào sau đây là thiết bị vào (input)?',
                'option_a' => 'Bàn phím', 'option_b' => 'Màn hình', 'option_c' => 'Máy in', 'option_d' => 'Loa',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 7, 'question' => '1 Kilobyte (KB) bằng bao nhiêu Byte?',
                'option_a' => '1000 Byte', 'option_b' => '1024 Byte', 'option_c' => '10000 Byte', 'option_d' => '1024 Kilobyte',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 7, 'question' => 'Phím tắt nào dùng để sao chép (copy) dữ liệu trong Windows?',
                'option_a' => 'Ctrl + C', 'option_b' => 'Ctrl + V', 'option_c' => 'Ctrl + X', 'option_d' => 'Ctrl + Z',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 7, 'question' => 'Trình duyệt web phổ biến của Google có tên là gì?',
                'option_a' => 'Safari', 'option_b' => 'Chrome', 'option_c' => 'Firefox', 'option_d' => 'Edge',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 7, 'question' => 'CPU viết tắt của từ gì?',
                'option_a' => 'Central Process Unit', 'option_b' => 'Central Processing Unit', 'option_c' => 'Computer processing Unit', 'option_d' => 'Central Processor Union',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 7, 'question' => 'SQL là viết tắt của từ gì?',
                'option_a' => 'Simple Query Language', 'option_b' => 'Structured Query Language', 'option_c' => 'System Query Language', 'option_d' => 'Sequential Query Language',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 7, 'question' => 'Đâu là địa chỉ IP hợp lệ?',
                'option_a' => '192.168.1.1', 'option_b' => '300.168.1.1', 'option_c' => '192.168.1.256', 'option_d' => '192.168.1',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 7, 'question' => 'Thiết bị dùng để kết nối các máy tính trong mạng internet lại với nhau là?',
                'option_a' => 'Router', 'option_b' => 'RAM', 'option_c' => 'Hard Disk', 'option_d' => 'Keyboard',
                'correct_answer' => 'A', 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'subject_id' => 7, 'question' => 'HTML dùng để làm gì?',
                'option_a' => 'Lập trình logic hệ thống', 'option_b' => 'Thiết kế cấu trúc trang web', 'option_c' => 'Quản lý cơ sở dữ liệu', 'option_d' => 'Cấu hình mạng',
                'correct_answer' => 'B', 'created_at' => now(), 'updated_at' => now(),
            ],
        ]);
    }
}