exports.getMonthly = async (req, res) => {
    try {
        const { month } = req.query;
        try {
            let query = 'SELECT * FROM monthly_performance';
            let params = [];
            if (month) {
                query += ' WHERE month = ?';
                params.push(month);
            }
            query += ' ORDER BY month ASC';

            const [rows] = await pool.query(query, params);
            if (!rows.length && !month) throw new Error("No monthly rows"); 
            return res.json(rows);
        } catch (dbErr) {
            console.warn("DB Connection failed, using JSON fallback for Monthly.", dbErr.message);
            const cache = getCachedData();
            if (cache && cache.monthly) {
                let mapped = cache.monthly.map(m => ({
                    month: m.month,
                    total_spend: m.spend,
                    total_revenue: m.revenue,
                    total_conversions: m.conversions,
                    roas: m.roas
                }));

                if (month) {
                    mapped = mapped.filter(m => m.month === month);
                }
                mapped.sort((a, b) => a.month.localeCompare(b.month));

                return res.json(mapped);
            }
            throw dbErr;
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};