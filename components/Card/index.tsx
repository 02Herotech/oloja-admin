'use client';

import Card from "./card";
import Icons from '@/components/icons';

const DashboardCards: React.FC = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            <Card title="All Tasks" value="120" percentage={7} description="0 Today · 1 Yesterday" icon={<Icons.CartIcon />} />
            <Card title="Ongoing Tasks" value="80" percentage={0} description="" icon={<Icons.OngoingTask />} />
            <Card title="Completed Tasks" value="40" percentage={-3} description="20 Today · 0 Yesterday" icon={<Icons.CompletedTaskIcon />} />
            <Card title="Total Income" value="100k" percentage={7} description="0 Today · $1200 Yesterday" icon={<Icons.TotalIncome />} />
        </div>
    );
};

export default DashboardCards;